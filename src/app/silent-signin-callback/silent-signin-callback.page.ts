import { Component, OnInit } from '@angular/core';
import { OIDCService } from '../oidc.service';

@Component({
  selector: 'app-silent-signin-callback',
  templateUrl: './silent-signin-callback.page.html',
  styleUrls: ['./silent-signin-callback.page.scss']
})
export class SilentSigninCallbackPage implements OnInit {

  constructor(private oidcService: OIDCService) { }

  async ngOnInit() {
    let response
    try {
      response = await this.oidcService.userManager.signinSilentCallback();
    } catch (e) {
      console.log('signinSilentCallback failed', e)
    }

    console.log('signinSilentCallback', response)
  }

}