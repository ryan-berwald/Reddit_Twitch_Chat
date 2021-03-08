import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { Comments } from '../interfaces/comments';
import { UserData } from '../interfaces/user-data';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsStoreService {
  private auth!: Auth;
  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {
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

  getComment(index: number) {
    this.commentService
      .getComments(
        this.userData[index].url,
        this.auth.access_token,
        this.auth.scope
      )
      .subscribe((comments: Comments[]) => {
        this.addComment(comments, this.userData[index].url); //could possibly peform data check in this method
      });
  }

  addComment(comments: Comments[], url: string) {
    //if url is in array at all, then filter out comments that aren't unique, append only new ones on end of array

    if (this.userData.some((e) => e.url == url)) {
      let index = this.userData.findIndex((e) => e.url === url);
      if (this.userData[index].comments.length > 0) {
        comments[1].data.children.forEach((e) => {
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
      } else {
        this.userData[index].comments = comments;
      }
    } else {
      //else just add entirely new url and element on end
      this.userData.push({
        url: url,
        comments: comments,
      });
    }
  }

  removeComment(url: string) {
    this.userData = this.userData.filter((comment) => comment.url !== url);
  }
}

//"/r/wallstreetbets/comments/lxi05e/daily_discussion_thread_for_march_04_2021/"
//"/r/wallstreetbets/comments/lxi05e/daily_discussion_thread_for_march_04_2021/"
