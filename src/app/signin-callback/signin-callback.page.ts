import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { OIDCService } from '../oidc.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.page.html',
  styleUrls: ['./signin-callback.page.scss'],
})
export class SignInCallbackPage implements OnInit {
  error = null

  constructor(private oidcService: OIDCService, private router: Router) { }

  ngOnInit(): void {
    this.handleResponse();
  }

  private async handleResponse() {
    let response
    try {
      response = await this.oidcService.userManager.signinRedirectCallback()
    } catch (e) {
      this.error = e
    }

    if (!this.error) {
      this.goHome()
    }
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
