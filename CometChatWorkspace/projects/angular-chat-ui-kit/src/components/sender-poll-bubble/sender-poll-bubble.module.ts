import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderPollBubbleComponent } from "./sender-poll-bubble/sender-poll-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";

@NgModule({
  declarations: [SenderPollBubbleComponent],
  imports: [CommonModule, ToolTipModule, ReadRecieptModule, ReplyCountModule],
  exports: [SenderPollBubbleComponent],
})
export class SenderPollBubbleModule {}
