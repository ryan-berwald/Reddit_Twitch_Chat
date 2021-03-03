import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from './interfaces/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  auth: Auth = { access_token: '', token_type: '', expires_in: 0, scope: '' };
  ngOnInit(): void {
    this.authService.getToken('read').subscribe((data) => {
      this.auth = data;
      return data;
    });
  }

  title = 'Reddit-Twitch-Chat';
}
