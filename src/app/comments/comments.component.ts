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
  @Input() auth: Auth | undefined;
  comments: Comments[] | undefined;
  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('in comments');
    console.log(this.auth); //data that is passed down from content.component.html using data binding and @input decorator
    //shows undefined
  }

  getComments(): void {
    this.commentService
      .getComments()
      .subscribe((comments) => (this.comments = comments));
  }

  //comments = this.data.data.children;
}
