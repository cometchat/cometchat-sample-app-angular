import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverPollBubbleComponent } from "./receiver-poll-bubble/receiver-poll-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";

@NgModule({
  declarations: [ReceiverPollBubbleComponent],
  imports: [CommonModule, ToolTipModule, ReadRecieptModule],
  exports: [ReceiverPollBubbleComponent],
})
export class ReceiverPollBubbleModule {}
