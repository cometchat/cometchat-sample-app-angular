import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderMessageBubbleComponent } from "./cometchat-sender-message-bubble/cometchat-sender-message-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";

@NgModule({
  declarations: [CometchatSenderMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    ToolTipModule,
    ReplyCountModule,
  ],
  exports: [CometchatSenderMessageBubbleComponent],
})
export class CometchatSenderMessageBubbleModule {}
