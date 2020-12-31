import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUnifiedComponent } from "./comet-chat-unified/comet-chat-unified.component";
import { NavBarModule } from "../nav-bar/nav-bar.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometChatUserDetailModule } from "../comet-chat-user-detail/comet-chat-user-detail.module";
import { MessageThreadModule } from "../message-thread/message-thread.module";
import { ImageViewModule } from "../image-view/image-view.module";
import { CometchatGroupDetailModule } from "../cometchat-group-detail/cometchat-group-detail.module";
import { CometchatCallAlertModule } from "../cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "../cometchat-call-screen/call-screen.module";

@NgModule({
  declarations: [CometChatUnifiedComponent],
  imports: [
    CommonModule,
    NavBarModule,
    CometchatMessageListScreenModule,
    CometChatUserDetailModule,
    MessageThreadModule,
    ImageViewModule,
    CometchatGroupDetailModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
  ],
  exports: [CometChatUnifiedComponent],
})
export class CometChatUnifiedModule {}
