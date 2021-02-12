import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { CommentService } from '../services/comment.service';
import { Comments } from '../interfaces/comments';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input()
  auth!: Auth;
  commentResponse: Comments[] = [];
  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): Comments[] {
    this.commentService
      .getComments('43z4gp', this.auth.access_token, this.auth.scope)
      .subscribe((comments) => {
        this.commentResponse = comments;
        console.log(this.commentResponse);
      });
    return this.commentResponse;
  }
}
