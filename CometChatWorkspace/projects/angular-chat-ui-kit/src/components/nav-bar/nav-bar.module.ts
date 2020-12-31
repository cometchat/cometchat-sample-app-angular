import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CometChatUserInfoScreenModule } from "../comet-chat-user-info-screen/comet-chat-user-info-screen.module";
import { CometChatUserContactListModule } from "../comet-chat-user-list/comet-chat-user-contact-list.module";
import { CometChatGroupListModule } from "../comet-chat-group-list/comet-chat-group-list.module";
import { CometChatConversationListModule } from "../comet-chat-conversation-list/comet-chat-conversation-list.module";

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    CometChatUserInfoScreenModule,
    CometChatUserContactListModule,
    CometChatGroupListModule,
    CometChatConversationListModule,
  ],
  exports: [NavBarComponent],
})
export class NavBarModule {}
