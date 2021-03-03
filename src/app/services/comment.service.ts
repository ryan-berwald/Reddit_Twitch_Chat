import { Injectable } from '@angular/core';
import { Comments } from '../interfaces/comments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiURL = 'https://oauth.reddit.com';

  constructor(private http: HttpClient) {}

  getComments(urlExt: string, accessToken: string, tokenScope: string) {
    let headers = {
      Authorization: 'bearer ' + accessToken,
      Accept: '*/*',
      scope: tokenScope,
      device_id: 'DO_NOT_TRACK_THIS_DEVICE',
    };

    let params = new HttpParams().set('sort', 'new').set('limit', '25');

    return this.http.get<Comments[]>(this.apiURL + urlExt, {
      headers: headers,
      params: params,
    });
  }
}

//'https://oauth.reddit.com/r/wallstreetbets/comments/libwy6'
