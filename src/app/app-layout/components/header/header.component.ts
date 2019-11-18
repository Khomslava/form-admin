import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  noData = 'N/A';

  @Input() isMobileLayout: boolean;
  @Input() sidenavOpened: boolean;
  @Output() toggleMenu = new EventEmitter();

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    // this.getUserData();
  }

  // toggleSidenav(): void {
  //   this.toggleMenu.emit();
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // goToLink() {
  //   this.router.navigate(['/projects']);
  // }

  // userInitials(): string {
  //   let initials = this.user.firstName ? this.user.firstName[0] : '';
  //   initials = this.user.lastName ? initials + this.user.lastName[0] : initials;
  //   return initials.toUpperCase();
  // }

  // getAvatarUrl(): string {
  //   return this.user.baseAssetUrl && this.user.avatarUrl && !this.user.avatarUrl.includes('http') ?
  //    `${this.user.baseAssetUrl}/${this.user.avatarUrl}` : this.user.avatarUrl;
  // }

  // private getUserData() {
  //   this.user = this.usersService.getUserStorage();

  //   if (this.user && this.user.id) {
  //     this.usersService.updatedCurrentUser(this.user.id).subscribe((user) => {
  //       this.user = user;
  //     });
  //   }
  // }
}
