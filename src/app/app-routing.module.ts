import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInCallbackPage } from './signin-callback/signin-callback.page';
import { HomePage } from './home/home.page';
import { SilentSigninCallbackPage } from './silent-signin-callback/silent-signin-callback.page';

const routes: Routes = [
  {
    path: 'signin-callback',
    component: SignInCallbackPage,
  },
  {
    path: 'silent-signin-callback',
    component: SilentSigninCallbackPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
