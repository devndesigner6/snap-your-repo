import { VercelRequest, VercelResponse } from '@vercel/node';

const axios = require('axios');

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { owner, repo } = req.query;

  // Validate input
  if (!owner || !repo) {
    res.status(400).json({
      success: false,
      error: 'Missing owner or repo parameter',
    });
    return;
  }

  try {
    // Fetch repository data from GitHub API
    const githubToken = process.env['GITHUB_TOKEN'] || '';
    
    // Build headers - token is optional
    const headers: any = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }
    
    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    const repoData = repoResponse.data;

    // Fetch languages for the repository
    let topLanguages: string[] = [];
    try {
      const langResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/languages`,
        { headers }
      );
      topLanguages = Object.keys(langResponse.data).slice(0, 5);
    } catch (err) {
      // If languages fetch fails, use the repo's primary language
      if (repoData.language) {
        topLanguages = [repoData.language];
      }
    }

    // Format response
    const formattedData = {
      link: repoData.html_url,
      owner: repoData.owner.login,
      repo: repoData.name,
      description: repoData.description || 'No description',
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.watchers_count || 0,
      issues: repoData.open_issues_count || 0,
      topLanguages: topLanguages,
      avatarUrl: repoData.owner.avatar_url,
      updatedAt: repoData.updated_at,
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      error: null,
      data: formattedData,
    });
  } catch (error: any) {
    console.error('Error fetching repo:', error.message);

    let errorMessage = 'Failed to fetch repository';
    if (error.response?.status === 404) {
      errorMessage = 'Repository not found';
    } else if (error.response?.status === 403) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(error.response?.status || 500).json({
      success: false,
      error: errorMessage,
      data: null,
    });
  }
};
