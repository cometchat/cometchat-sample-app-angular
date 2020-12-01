import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageThreadComponent } from "./message-thread/message-thread.component";
import { CometChatSenderMessageBubbleModule } from "../comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometChatMessageComposerModule } from "../comet-chat-message-composer/comet-chat-message-composer.module";

@NgModule({
  declarations: [MessageThreadComponent],
  imports: [
    CommonModule,
    CometChatSenderMessageBubbleModule,
    MessageListModule,
    CometChatMessageComposerModule,
  ],
  exports: [MessageThreadComponent],
})
export class MessageThreadModule {}
