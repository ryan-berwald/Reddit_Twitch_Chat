import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  //private apiURL = 'oauth.reddit.com';

  constructor(private http: HttpClient) {}

  getComments(
    urlExt: string,
    accessToken: string,
    tokenScope: string
  ): Observable<Comments[]> {
    let headers = {
      Authorization: 'bearer ' + accessToken,
      Accept: '*/*',
      scope: 'read',
      device_id: 'DO_NOT_TRACK_THIS_DEVICE',
    };
    return this.http.get<Comments[]>(
      'https://oauth.reddit.com/r/wallstreetbets/comments/libwy6',
      {
        headers,
      }
    );
  }
}
