import { Component, OnInit, Input } from '@angular/core';

import { NavigationItems } from '../../../shared/consts/storage.consts';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems = NavigationItems;
  @Input() isMobileLayout: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.menuItems);
  }

}
