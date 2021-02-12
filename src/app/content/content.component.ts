import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth } from '../interfaces/auth';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  constructor(private authService: AuthService) {}
  auth: Auth | undefined;
  ngOnInit(): void {
    this.authService.getToken('read').subscribe((data) => {
      this.auth = data;
      return data;
    });
  }
}
