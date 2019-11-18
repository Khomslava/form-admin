import { Router } from '@angular/router';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  expanded = false;
  @Input() item: any;
  @Input() depth: any;
  @Input() isMobileLayout: any;
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    // private layoutService: LayoutService,
    private host: ElementRef<HTMLElement>
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(
        
      )
  }

}
