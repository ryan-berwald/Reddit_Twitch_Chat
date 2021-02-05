import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comments } from './comments';
import { COMMENTS } from './mock-comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private commentService: CommentService) {}

  getComments(): Observable<Comments[]> {
    return of(COMMENTS);
  }
}
