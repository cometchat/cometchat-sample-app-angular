import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { KitchenSinkAppComponent } from "./App-Components/kitchen-sink-app/kitchen-sink-app.component";
import { FormsModule } from "@angular/forms";
import { HomePageComponent } from "./App-Components/home-page/home-page.component";
import { UserListPageComponent } from "./App-Components/user-list-page/user-list-page.component";
import { CometChatConversationListPageComponent } from "./App-Components/Pages/comet-chat-conversation-list-page/comet-chat-conversation-list-page.component";
import { UserListScreenPageComponent } from "./App-Components/user-list-screen-page/user-list-screen-page.component";
import { CometChatMessageComposerPageComponent } from "./App-Components/Pages/comet-chat-message-composer-page/comet-chat-message-composer-page.component";
import { CometChatGroupListScreenPageComponent } from "./App-Components/Pages/comet-chat-group-list-screen-page/comet-chat-group-list-screen-page.component";
import { CometChatConversationListScreenPageComponent } from "./App-Components/Pages/comet-chat-conversation-list-screen-page/comet-chat-conversation-list-screen-page.component";
import { GroupListComponent } from "./App-Components/Pages/group-list/group-list.component";
import { GroupListScreenPageComponent } from "./App-Components/Pages/group-list-screen-page/group-list-screen-page.component";
import { CometChatUnifiedPageComponent } from "./App-Components/Pages/comet-chat-unified-page/comet-chat-unified-page.component";

import { CometchatConversationListModule } from "../components/Chats/cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatConversationListWithMessagesModule } from "../components/Chats/cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.module";
import { CometchatGroupListModule } from "../components/Groups/cometchat-group-list/cometchat-group-list.module";
import { CometchatGroupWithMessagesModule } from "../components/Groups/cometchat-group-with-messages/cometchat-group-with-messages.module";
import { CometchatModule } from "../components/CometChat/cometchat/cometchat.module";
import { CometchatUserListModule } from "../components/Users/cometchat-user-list/cometchat-user-list.module";
import { CometchatUserListWithMessagesModule } from "../components/Users/cometchat-user-list-with-messages/cometchat-user-list-with-messages.module";
import { CometchatAvatarModule } from "../components/Shared/cometchat-avatar/cometchat-avatar.module";
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
    CometchatModule,
    CometchatConversationListWithMessagesModule,
    CometchatGroupWithMessagesModule,
    CometchatUserListWithMessagesModule,
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
