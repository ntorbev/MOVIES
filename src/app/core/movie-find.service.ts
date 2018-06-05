import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieFindService {
  url = 'https://api.themoviedb.org/3/search/movie';
  apiKey = '2fe492f749a93ebdc66212c9dd3b7016';

  constructor(private http: HttpClient) {
  }

  find(value: string): Observable<any> {
    return this.buildReq(value, '1').pipe(
      flatMap((data) => {
        const pages = Array.from({ length: data.total_pages - 1 }, (v, i) => this.buildReq(value, (i + 2).toString()));
        return forkJoin(...pages, (...movies: any[]) => {
          movies.unshift(data);
          return movies;
        });
      })
    );
  }

  private buildReq(value: string, page: string): Observable<any> {
    const url = `${this.url}?api_key=${this.apiKey}&language=en-US&query=${value}&page=${page}&include_adult=false`;
    return this.http.get(url);
  }
}
