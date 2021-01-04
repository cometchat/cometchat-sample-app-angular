import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderMessageBubbleComponent } from "./cometchat-sender-message-bubble/cometchat-sender-message-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";

@NgModule({
  declarations: [CometchatSenderMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
  ],
  exports: [CometchatSenderMessageBubbleComponent],
})
export class CometchatSenderMessageBubbleModule {}
