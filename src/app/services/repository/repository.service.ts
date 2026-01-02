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
    // Remove trailing slash and .git if present
    let cleanLink = link.endsWith('/') ? link.slice(0, -1) : link;
    cleanLink = cleanLink.endsWith('.git') ? cleanLink.slice(0, -4) : cleanLink;

    // Extract from URL
    const linkParts = cleanLink.split('/');
    
    let repo = linkParts[linkParts.length - 1];
    let owner = linkParts[linkParts.length - 2];

    // Handle edge cases
    if (!repo || !owner) {
      throw new Error('Invalid GitHub URL format');
    }

    return {
      owner: owner.trim(),
      repo: repo.trim(),
    };
  }
}
