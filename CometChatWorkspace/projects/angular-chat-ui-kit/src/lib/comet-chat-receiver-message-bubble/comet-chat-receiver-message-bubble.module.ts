import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatReceiverMessageBubbleComponent } from "./comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [CometChatReceiverMessageBubbleComponent],
  imports: [CommonModule, ToolTipModule],
  exports: [CometChatReceiverMessageBubbleComponent],
})
export class CometChatReceiverMessageBubbleModule {}
