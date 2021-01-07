import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  CometchatConversationListModule,
  CometchatConversationListWithMessagesModule,
  CometchatGroupListModule,
  CometchatGroupListScreenModule,
  CometchatAppModule,
  CometchatUserListModule,
  CometchatUserListScreenModule,
  CometchatAvatarModule,
} from "angular-chat-ui-kit";
import { KitchenSinkAppComponent } from "./Components/kitchen-sink-app/kitchen-sink-app.component";
import { FormsModule } from "@angular/forms";
import { HomePageComponent } from "./Components/home-page/home-page.component";
import { UserListPageComponent } from "./Components/user-list-page/user-list-page.component";
import { CometChatConversationListPageComponent } from "./Components/Pages/comet-chat-conversation-list-page/comet-chat-conversation-list-page.component";
import { UserListScreenPageComponent } from "./Components/user-list-screen-page/user-list-screen-page.component";
import { CometChatMessageComposerPageComponent } from "./Components/Pages/comet-chat-message-composer-page/comet-chat-message-composer-page.component";
import { CometChatGroupListScreenPageComponent } from "./Components/Pages/comet-chat-group-list-screen-page/comet-chat-group-list-screen-page.component";
import { CometChatConversationListScreenPageComponent } from "./Components/Pages/comet-chat-conversation-list-screen-page/comet-chat-conversation-list-screen-page.component";
import { GroupListComponent } from "./Components/Pages/group-list/group-list.component";
import { GroupListScreenPageComponent } from "./Components/Pages/group-list-screen-page/group-list-screen-page.component";
import { CometChatUnifiedPageComponent } from "./Components/Pages/comet-chat-unified-page/comet-chat-unified-page.component";

@NgModule({
  declarations: [
    AppComponent,
    KitchenSinkAppComponent,
    HomePageComponent,
    UserListPageComponent,
    CometChatConversationListPageComponent,
    UserListScreenPageComponent,
    CometChatMessageComposerPageComponent,
    CometChatGroupListScreenPageComponent,
    CometChatConversationListScreenPageComponent,
    GroupListComponent,
    GroupListScreenPageComponent,
    CometChatUnifiedPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CometchatAppModule,
    CometchatConversationListWithMessagesModule,
    CometchatGroupListScreenModule,
    CometchatUserListScreenModule,
    CometchatConversationListModule,
    CometchatGroupListModule,
    CometchatUserListModule,
    CometchatAvatarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
