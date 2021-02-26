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
    this.userData = [
      ...this.userData,
      { url: userData.url, comments: userData.comments },
    ];
    console.log('added comment: ' + this.userData);
  }

  removeComment(url: string) {
    this.userData = this.userData.filter((comment) => comment.url !== url);
  }
}
