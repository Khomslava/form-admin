import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services';
import { StorageService } from '../../../core/services';
import { AuthStorageTokens } from '../../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
    rememberMe: [false]
  });
  @ViewChild('emailField', { static: true }) emailField: ElementRef;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.emailField.nativeElement.focus();
    });
  }

  login() {
    const { email, password, rememberMe } = this.form.value;

    if (rememberMe) {
      this.storageService.localStorageSet(AuthStorageTokens.REMEMBER_ME, rememberMe);
    }

    // this.authService.login(email, password).subscribe(res => {
    //   this.router.navigate(['/interiors']);
    // });
  }

  togglePswVisibility(): void {
    this.hide = !this.hide;
  }

  onInputEnter(event): void {
    event.preventDefault();

    if (!this.form.invalid) {
      this.login();
    }
  }

  // goToForgrotPassword() {
  //   this.router.navigate(['login/forgot-password']);
  // }
}
