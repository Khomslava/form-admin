import { Component, OnInit } from '@angular/core';
import { NavigationItems } from '../../../shared/consts/storage.consts';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems = NavigationItems;

  constructor() { }

  ngOnInit() {
  }

}
