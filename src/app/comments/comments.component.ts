import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Auth } from '../interfaces/auth';
import { CommentService } from '../services/comment.service';
import { Comments } from '../interfaces/comments';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CommentsStoreService } from '../store/comments-store.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input()
  auth!: Auth;
  commentResponse!: Comments[];
  modalRef!: BsModalRef;
  userURL = '';
  prevLength!: number;
  private updateSubscription!: Subscription;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService,
    public commentStore: CommentsStoreService,
    private resolver: ComponentFactoryResolver
  ) {}

  @ViewChild('ref', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnInit(): void {
    this.updateSubscription = interval(15000).subscribe((val) => {
      console.log('15 seconds');
      if (this.userURL) {
        this.commentService
          .getComments(this.userURL, this.auth.access_token, this.auth.scope)
          .subscribe((comments) => {
            console.log('adding comments');
            this.commentStore.addComment(comments);
          });
      }
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
      });
    //this.commentResponse[0].data.children[0].data.......
  }

  createComponent(comp: ViewContainerRef) {
    this.container.clear();
    const factory: ComponentFactory = this.resolver.resolveComponentFactory(
      CommentsComponent
    );
  }
}
