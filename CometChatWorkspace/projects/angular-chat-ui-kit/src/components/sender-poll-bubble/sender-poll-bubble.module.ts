import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderPollBubbleComponent } from "./sender-poll-bubble/sender-poll-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";

@NgModule({
  declarations: [SenderPollBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
  ],
  exports: [SenderPollBubbleComponent],
})
export class SenderPollBubbleModule {}
