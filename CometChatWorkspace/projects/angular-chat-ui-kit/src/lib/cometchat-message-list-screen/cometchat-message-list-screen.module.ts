import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListScreenComponent } from "./cometchat-message-list-screen/cometchat-message-list-screen.component";
import { MessageHeaderModule } from "../message-header/message-header.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometChatMessageComposerModule } from "../comet-chat-message-composer/comet-chat-message-composer.module";

@NgModule({
  declarations: [CometchatMessageListScreenComponent],
  imports: [
    CommonModule,
    MessageHeaderModule,
    CometChatMessageComposerModule,
    MessageListModule,
  ],
  exports: [CometchatMessageListScreenComponent],
})
export class CometchatMessageListScreenModule {}
