import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUnifiedComponent } from "./comet-chat-unified/comet-chat-unified.component";
import { NavBarModule } from "../nav-bar/nav-bar.module";
import { CometchatMessageListScreenModule } from "../cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometChatUserDetailModule } from "../comet-chat-user-detail/comet-chat-user-detail.module";
import { MessageThreadModule } from "../message-thread/message-thread.module";
import { ImageViewModule } from "../image-view/image-view.module";

@NgModule({
  declarations: [CometChatUnifiedComponent],
  imports: [
    CommonModule,
    NavBarModule,
    CometchatMessageListScreenModule,
    CometChatUserDetailModule,
    MessageThreadModule,
    ImageViewModule,
  ],
  exports: [CometChatUnifiedComponent],
})
export class CometChatUnifiedModule {}
