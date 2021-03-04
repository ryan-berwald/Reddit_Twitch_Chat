import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { UserData } from '../interfaces/user-data';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsStoreService {
  //private
  auth!: Auth;
  constructor(private authService: AuthService) {
    this.auth = { access_token: '', token_type: '', expires_in: 0, scope: '' };
  }

  private readonly _userData = new BehaviorSubject<UserData[]>([]);
  readonly userData$ = this._userData.asObservable();

  get userData(): UserData[] {
    return this._userData.getValue();
  }

  set userData(val: UserData[]) {
    this._userData.next(val);
  }

  getToken() {
    this.authService
      .getToken('read')
      .toPromise()
      .then((e) => {
        this.auth.access_token = e.access_token;
        this.auth.expires_in = e.expires_in;
        this.auth.scope = e.scope;
        this.auth.token_type = e.token_type;
      });
  }

  addComment(userData: UserData) {
    if (this.userData == undefined) {
      //if this is initial url, create index 0 of array
      this.userData = [{ url: userData.url, comments: userData.comments }];
    } else {
      //if url is in array at all, then filter out comments that aren't unique, append only new ones on end of array
      if (this.userData.some((e) => e.url === userData.url)) {
        let index = this.userData.findIndex((e) => e.url == userData.url);

        userData.comments[1].data.children.forEach((e) => {
          if (
            this.userData[index].comments[1].data.children.some(
              (x) => x.data.body == e.data.body
            )
          ) {
            console.log('duplicate');
          } else {
            this.userData[index].comments[1].data.children.push(e);
          }
        });

        //this.userData = [...this.userData, userData];
      } else {
        //else just add entirely new url and element on end
        this.userData.push({
          url: userData.url,
          comments: userData.comments,
        });
      }
    }
  }

  removeComment(url: string) {
    this.userData = this.userData.filter((comment) => comment.url !== url);
  }
}
