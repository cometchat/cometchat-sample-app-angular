import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverMessageBubbleComponent } from "./comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.component";

@NgModule({
  declarations: [CometChatReceiverMessageBubbleComponent],
  imports: [CommonModule],
  exports: [CometChatReceiverMessageBubbleComponent],
})
export class CometChatReceiverMessageBubbleModule {}
