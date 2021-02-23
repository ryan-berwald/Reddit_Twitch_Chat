import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { FinalComments } from '../interfaces/final-comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsStoreService {
  constructor() {}

  private readonly _comments = new BehaviorSubject<Comments[]>([]);
  readonly comments$ = this._comments.asObservable();

  get comments(): Comments[] {
    return this._comments.getValue();
  }

  set comments(val: Comments[]) {
    this._comments.next(val);
  }

  addComment(/*body: string, author: string, id: string*/ array: Comments[]) {
    // we assaign a new copy of comments by adding a new comment to it
    if (this.comments.length < array.length) {
      this.comments = [];
      this.comments = [...this.comments, ...array];
    }
  }

  /* removeComment(id: string) {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  } */
}
