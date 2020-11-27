import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatSenderMessageBubbleComponent } from "./comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";

@NgModule({
  declarations: [CometChatSenderMessageBubbleComponent],
  imports: [CommonModule, ReadRecieptModule],
  exports: [CometChatSenderMessageBubbleComponent],
})
export class CometChatSenderMessageBubbleModule {}
