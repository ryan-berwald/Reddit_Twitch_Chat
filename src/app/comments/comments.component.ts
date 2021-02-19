import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { CommentService } from '../services/comment.service';
import { Comments } from '../interfaces/comments';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input()
  auth!: Auth;
  @Input() userURL!: string;
  URL!: String;
  //finalComments: String[] = [];
  commentResponse!: Observable<Comments[]>;
  modalRef!: BsModalRef;
  constructor(
    private commentService: CommentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  getComments(userUrl: string): Observable<Comments[]> {
    let commentResponse: Comments[] = [];

    this.auth.scope = 'read';
    this.commentService
      .getComments(userUrl, this.auth.access_token, this.auth.scope)
      .subscribe((comments) => {
        commentResponse = comments;
        console.log(commentResponse);
      });
    /*     for (let x = 0; x < commentResponse[0].data.children.length; x++) {
      this.finalComments.push(commentResponse[1].data.children[x].data.body);
    }
    return this.finalComments; */
    return this.commentResponse;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
