import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListScreenComponent } from "./cometchat-conversation-list-screen/cometchat-conversation-list-screen.component";
import { CometchatConversationListModule } from "../cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometChatUserDetailModule } from "../comet-chat-user-detail/comet-chat-user-detail.module";
import { MessageThreadModule } from "../message-thread/message-thread.module";
import { ImageViewModule } from "../image-view/image-view.module";
import { CometchatGroupDetailModule } from "../cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometchatConversationListScreenComponent],
  imports: [
    CommonModule,
    CometchatConversationListModule,
    CometchatMessageListScreenModule,
    CometChatUserDetailModule,
    CometchatGroupDetailModule,
    MessageThreadModule,
    ImageViewModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
  ],
  exports: [CometchatConversationListScreenComponent],
})
export class CometchatConversationListScreenModule {}
