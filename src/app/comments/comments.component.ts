import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { CommentService } from '../services/comment.service';
import { Comments } from '../interfaces/comments';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommentsStoreService } from '../store/comments-store.service';
import { interval, Subscription } from 'rxjs';
import { UserData } from '../interfaces/user-data';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input()
  auth: Auth = { access_token: '', token_type: '', expires_in: 0, scope: '' };
  @Input()
  inputURL!: string;
  modalRef!: BsModalRef;
  //userData!: Array<UserData>;
  userData: UserData = { url: '', comments: [] };
  private updateSubscription!: Subscription;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService,
    public commentStore: CommentsStoreService
  ) {}

  ngOnInit(): void {
    this.updateSubscription = interval(15000).subscribe((val) => {
      console.log('15 seconds');
      if (this.commentStore.userData.length > 0) {
        for (let x = 0; x < this.commentStore.userData.length; x++) {
          this.commentService
            .getComments(
              this.commentStore.userData[x].url,
              this.auth.access_token,
              this.auth.scope
            )
            .subscribe((comments) => {
              this.userData.comments = comments;
              this.commentStore.addComment(this.userData);
            });
        }
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onKey(value: string) {
    this.userData.url = value;

    this.commentService
      .getComments(this.userData.url, this.auth.access_token, this.auth.scope)
      .subscribe((comments) => {
        this.userData.comments = comments;
        this.commentStore.addComment(this.userData);
      });
  }
}
