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
  //finalComments: String[] = [];
  commentResponse!:Observable<Comments[]>;
  modalRef!: BsModalRef;
  userURL = '';
  constructor(
    private commentService: CommentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  getComments() {
    //let commentResponse: Comments[] = [];

    this.auth.scope = 'read';
    this.commentResponse =this.commentService
      .getComments(this.userURL, this.auth.access_token, this.auth.scope);
      /* .subscribe((comments) => {
        commentResponse = comments;
        console.log(commentResponse);
      }) */;
    /*     for (let x = 0; x < commentResponse[0].data.children.length; x++) {
      this.finalComments.push(commentResponse[1].data.children[x].data.body);
    }
    return this.finalComments; */
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onKey(value:string){
    this.userURL = value;
    this.getComments();
  }
}
