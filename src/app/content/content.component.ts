import { Component, OnInit, Input } from '@angular/core';
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
    console.log('in content');
    //gets auth token from services/auth.service.ts -- getting token works correctly, just does not work here
    this.authService.getToken('read').subscribe((data) => {
      this.auth = data;
      console.log(data); //returns undefined
      //data contains an auth object that is supposed to get set to the auth variable, but is undefined
    });
  }
}
