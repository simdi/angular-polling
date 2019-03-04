import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'https://hn.algolia.com/api/v1';

  constructor( private http: HttpClient ) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search_by_date?tags=story`);
  }
}
