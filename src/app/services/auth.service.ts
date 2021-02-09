import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(scope: string): Observable<Auth> {
    let token: Observable<string>;

    let headers = {
      Authorization:
        'Basic ' + btoa('f8LKeRefRLSBoQ:8v6mYMuG5g8vuDzTPqSRp4QO9y2Ueg'),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    let bodyData = {
      grant_type: 'client_credentials',
      scope: scope,
    };

    let data = this.encodeDataToURL(bodyData);

    return this.http.post<Auth>(
      'https://www.reddit.com/api/v1/access_token',
      data,
      {
        headers,
      }
    );
  }

  //encodes data to xml form that reddit API likes
  encodeDataToURL(data: any) {
    return Object.keys(data)
      .map((value) => `${value}=${encodeURIComponent(data[value])}`)
      .join('&');
  }
}
