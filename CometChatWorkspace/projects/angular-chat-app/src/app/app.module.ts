import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularChatUiKitModule } from 'angular-chat-ui-kit'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularChatUiKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
