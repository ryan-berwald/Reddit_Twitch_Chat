import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  dropCollapsed: boolean = true;
  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  changeCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeDropCollapsed(): void {
    this.dropCollapsed = !this.dropCollapsed;
  }
}
