import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatSenderMessageBubbleComponent } from "./comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [CometChatSenderMessageBubbleComponent],
  imports: [CommonModule, ReadRecieptModule, ToolTipModule],
  exports: [CometChatSenderMessageBubbleComponent],
})
export class CometChatSenderMessageBubbleModule {}
