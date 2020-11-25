import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatSenderMessageBubbleComponent } from "./comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.component";

@NgModule({
  declarations: [CometChatSenderMessageBubbleComponent],
  imports: [CommonModule],
  exports: [CometChatSenderMessageBubbleComponent],
})
export class CometChatSenderMessageBubbleModule {}
