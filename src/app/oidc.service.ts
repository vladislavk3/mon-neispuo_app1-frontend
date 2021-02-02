import { Injectable } from '@angular/core';
import * as Oidc from 'oidc-client';
import { UserManager } from 'oidc-client';
import { environment } from '../environments/environment';

if (!environment.production) {
  Oidc.Log.logger = console
  Oidc.Log.level = Oidc.Log.DEBUG
}

@Injectable({
  providedIn: 'root',
})
export class OIDCService {
  authState = null;

  userManager = new UserManager({
    authority: 'https://dss-oidc-server.zenoncultural.com',
    client_id: 'app1',
    redirect_uri: 'https://dss-app1.zenoncultural.com/signin-callback',
    silent_redirect_uri: 'https://dss-app1.zenoncultural.com/silent-signin-callback',
    post_logout_redirect_uri: 'https://dss-app1.zenoncultural.com/home',
    response_type: 'code',
    scope: 'openid offline_access',
    monitorSession: true,
    checkSessionInterval: 5000,
    stopCheckSessionOnError: false,
    automaticSilentRenew: true,
  });

  start() {
    this.userManager.removeUser() // clear local session to prevent OP rejection when another RP has logged in with different account
    this.userManager.signinSilent() // auto-login using iframe

    // update state when user changes
    this.userManager.events.addUserLoaded((v) => (this.authState = {profile: v.profile, id_token: v.id_token}));
    this.userManager.events.addUserUnloaded(() => (this.authState = null));
    this.userManager.events.addUserSignedOut(() => this.userManager.removeUser())
  }
}
