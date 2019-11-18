import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LayoutService } from '../../../services/layout.service';

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

  constructor(public router: Router, private layoutService: LayoutService, private host: ElementRef<HTMLElement>) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(
        startWith(new NavigationEnd(0, this.router.url, this.router.url)),
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(({ url }) => {
        const match = url.search(this.item.route);

        if (match > -1 && this.depth > 0) {
          this.host.nativeElement.dispatchEvent(new CustomEvent('expand', { bubbles: true }));
        }
      });
  }

  expand(): void {
    if (this.expanded) {
      return;
    }
    requestAnimationFrame(() => {
      this.expanded = true;
    });
  }

  onItemSelected(item) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      if (this.isMobileLayout) {
        // TODO
        // this.layoutService.closeNav();
      }
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
