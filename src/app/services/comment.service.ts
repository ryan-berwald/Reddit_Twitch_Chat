import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiURL = 'https://oauth.reddit.com';

  constructor(private http: HttpClient) {}

  getComments(
    urlExt: string,
    accessToken: string,
    tokenScope: string
  ): Observable<Comments[]> {
    let headers = {
      Authorization: 'bearer ' + accessToken,
      Accept: '*/*',
      scope: tokenScope,
      device_id: 'DO_NOT_TRACK_THIS_DEVICE',
    };

    return this.http.get<Comments[]>(this.apiURL + urlExt, {
      headers,
    });
  }
}

//'https://oauth.reddit.com/r/wallstreetbets/comments/libwy6'
