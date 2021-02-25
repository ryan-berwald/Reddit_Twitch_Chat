import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from './interfaces/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  auth: Auth | undefined;
  ngOnInit(): void {
    this.authService.getToken('read').subscribe((data) => {
      this.auth = data;
      return data;
    });
  }
  title = 'Reddit-Twitch-Chat';
}
