import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularChatUiKitModule } from 'angular-chat-ui-kit';
import { KitchenSinkAppComponent } from './Components/kitchen-sink-app/kitchen-sink-app.component'
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { UserListPageComponent } from './Components/user-list-page/user-list-page.component';
import { CometChatConversationListPageComponent } from './Components/Pages/comet-chat-conversation-list-page/comet-chat-conversation-list-page.component';
import { UserListScreenPageComponent } from './Components/user-list-screen-page/user-list-screen-page.component';

@NgModule({
  declarations: [
    AppComponent,
    KitchenSinkAppComponent,
    HomePageComponent,
    UserListPageComponent,
    CometChatConversationListPageComponent,
    UserListScreenPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularChatUiKitModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
