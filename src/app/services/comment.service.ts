import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiURL = 'oauth.reddit.com';
  constructor(private http: HttpClient) {}

  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.apiURL);
  }
}
