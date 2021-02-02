import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInCallbackPage } from './signin-callback/signin-callback.page';
import { HomePage } from './home/home.page';
import { SilentSigninCallbackPage } from './silent-signin-callback/silent-signin-callback.page';

@NgModule({
  declarations: [AppComponent, SignInCallbackPage, HomePage, SilentSigninCallbackPage],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
