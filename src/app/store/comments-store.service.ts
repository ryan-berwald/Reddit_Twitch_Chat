import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class CommentsStoreService {
  constructor() {}
  private readonly _userData = new BehaviorSubject<UserData[]>([]);
  readonly userData$ = this._userData.asObservable();

  get userData(): UserData[] {
    return this._userData.getValue();
  }

  set userData(val: UserData[]) {
    this._userData.next(val);
  }

  addComment(userData: UserData) {
    console.log(this.userData);
    if (this.userData.length == 0) {
      this.userData = [{ url: userData.url, comments: userData.comments }];
    } else {
      for (let x = 0; x < this.userData.length; x++) {
        if (this.userData[x].url == userData.url) {
          for (let i = 0; i < this.userData[x].comments.length; i++) {
            if (this.userData[x].comments[i] == userData.comments[i]) {
              this.userData[x].comments[i] = userData.comments[i];
            }
          }
        } else {
          //need to figure out how to add data without creating entirely new element
          console.log('else');
        }
      }
    }
    console.log('added comment: ' + this.userData);
  }

  removeComment(url: string) {
    this.userData = this.userData.filter((comment) => comment.url !== url);
  }
}
