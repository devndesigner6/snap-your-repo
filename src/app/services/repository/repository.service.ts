import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '@/environments/environment';
import { MOCK_REPOSITORY_DATA } from '@/data';
import { ApiResponse, Repository } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  #http = inject(HttpClient);

  fetchRepository(owner: string, repo: string): Observable<Repository> {
    if (!environment.allowApiCalls) {
      return of(MOCK_REPOSITORY_DATA).pipe(delay(500));
    }
    return this.#http
      .get<ApiResponse<Repository>>(environment.apiUrl + '/info', {
        params: {
          owner,
          repo,
        },
      })
      .pipe(
        map((response) => {
          if (!response.success || response.error) {
            throw new Error(response.error || 'Failed to fetch repository');
          }

          if (!response.data) {
            throw new Error('No repository data returned');
          }

          return response.data;
        }),
        catchError((err) => {
          // Handle all error types
          let message = 'Failed to fetch repository';
          
          if (err instanceof Error) {
            message = err.message;
          } else if (err.error?.error) {
            message = err.error.error;
          } else if (err.error?.message) {
            message = err.error.message;
          } else if (typeof err.error === 'string') {
            message = err.error;
          }
          
          return throwError(() => new Error(message));
        }),
      );
  }

  extractDetails(link: string): { owner: string; repo: string } {
    try {
      // Remove whitespace
      let cleanLink = link.trim();
      
      // Add https if missing
      if (!cleanLink.startsWith('http')) {
        cleanLink = 'https://' + cleanLink;
      }
      
      // Parse as URL
      const url = new URL(cleanLink);
      const pathname = url.pathname;
      
      // Split pathname: /owner/repo or /owner/repo.git
      const parts = pathname.split('/').filter(part => part.length > 0);
      
      if (parts.length < 2) {
        throw new Error('Invalid GitHub URL format');
      }
      
      let owner = parts[0];
      let repo = parts[1];
      
      // Remove .git suffix
      if (repo.endsWith('.git')) {
        repo = repo.slice(0, -4);
      }
      
      if (!owner || !repo) {
        throw new Error('Invalid GitHub URL format');
      }
      
      return {
        owner: owner.trim(),
        repo: repo.trim(),
      };
    } catch (err) {
      throw new Error('Invalid GitHub URL format');
    }
  }
}
