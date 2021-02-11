import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  dropCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeCollapsed() : void {
    this.isCollapsed = !this.isCollapsed;
  }

  changeDropCollapsed() : void {
    this.dropCollapsed = !this.dropCollapsed;
  }
}
