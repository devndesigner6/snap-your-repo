# SnapRepo API - Backend Setup Guide

This guide explains how to set up and deploy the SnapRepo backend API created by **Hemanth**.

## Overview

The API is built with **Vercel Serverless Functions** and fetches real GitHub repository data using the GitHub API.

## Files

- `api/info.ts` - Main API endpoint that fetches repo data

## Setup Instructions

### Step 1: Get a GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "SnapRepo API"
4. Select scopes: `public_repo`, `repo:status`
5. Generate and copy the token (you won't see it again!)

### Step 2: Update Environment Configuration

In your frontend (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: true,
  allowApiCalls: true,  // Change to true
  apiUrl: 'https://your-vercel-deployment.vercel.app',  // Your API URL
};
```

### Step 3: Deploy to Vercel

**Option A: Deploy via Git (Recommended)**

1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "Add New" → "Project"
5. Select your `snap-your-repo` repository
6. Under "Environment Variables", add:
   - **Key:** `GITHUB_TOKEN`
   - **Value:** Your GitHub token from Step 1
7. Click "Deploy"

**Option B: Deploy via Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel
# Follow prompts and add GITHUB_TOKEN environment variable
```

### Step 4: Verify the API

Once deployed, test the API:
```
https://your-vercel-deployment.vercel.app/api/info?owner=angular&repo=angular
```

You should get a JSON response with repository data.

## API Endpoint

**URL:** `/api/info`

**Parameters:**
- `owner` (required): GitHub username/organization
- `repo` (required): Repository name

**Response:**
```json
{
  "success": true,
  "error": null,
  "data": {
    "link": "https://github.com/owner/repo",
    "owner": "owner",
    "repo": "repo",
    "description": "Repository description",
    "stars": 1234,
    "forks": 567,
    "watchers": 890,
    "issues": 12,
    "topLanguages": ["TypeScript", "HTML"],
    "avatar": "https://avatars.githubusercontent.com/...",
    "updatedAt": "2026-01-02T..."
  }
}
```

## Troubleshooting

**"API rate limit exceeded"**
- Your requests exceeded GitHub's rate limit
- Add `GITHUB_TOKEN` to Vercel environment variables
- With a token, you get 5,000 requests/hour instead of 60/hour

**"Repository not found"**
- Check the owner and repo names are correct
- Ensure the repository is public

**CORS errors**
- The API has CORS headers enabled
- Should work from any frontend

## Created By

**Hemanth** - SnapRepo API Backend

---

For questions, refer to the [GitHub API Documentation](https://docs.github.com/en/rest)
