import {
  AfterContentChecked,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Auth } from '../interfaces/auth';
import { CommentService } from '../services/comment.service';
import { Comments } from '../interfaces/comments';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommentsStoreService } from '../store/comments-store.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, AfterContentChecked {
  @Input()
  auth!: Auth;
  commentResponse!: Comments[];
  modalRef!: BsModalRef;
  userURL = '';
  constructor(
    private commentService: CommentService,
    private modalService: BsModalService,
    public commentStore: CommentsStoreService
  ) {}

  ngOnInit(): void {}

  ngAfterContentChecked() {
    this.commentService
      .getComments(this.userURL, this.auth.access_token, this.auth.scope)
      .subscribe((comments) => {
        this.commentResponse = comments;
        this.commentStore.addComment(this.commentResponse);
        console.log(this.commentResponse);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onKey(value: string) {
    this.userURL = value;
    this.auth.scope = 'read';

    this.commentService
      .getComments(this.userURL, this.auth.access_token, this.auth.scope)
      .subscribe((comments) => {
        this.commentResponse = comments;
        this.commentStore.addComment(this.commentResponse);
        console.log(this.commentResponse);
      });
    //this.commentResponse[0].data.children[0].data.......
  }
}
