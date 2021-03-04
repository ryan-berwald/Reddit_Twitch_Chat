import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from './interfaces/auth';
import { CommentsStoreService } from './store/comments-store.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private commentStore: CommentsStoreService) {}

  ngOnInit(): void {
    this.commentStore.getToken();
  }

  title = 'Reddit-Twitch-Chat';
}
