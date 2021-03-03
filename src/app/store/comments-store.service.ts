import { Injectable } from '@angular/core';
import { element } from 'protractor';
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
