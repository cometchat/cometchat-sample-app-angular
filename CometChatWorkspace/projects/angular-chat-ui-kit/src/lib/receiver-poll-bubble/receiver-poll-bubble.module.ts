import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverPollBubbleComponent } from "./receiver-poll-bubble/receiver-poll-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [ReceiverPollBubbleComponent],
  imports: [CommonModule, ToolTipModule],
  exports: [ReceiverPollBubbleComponent],
})
export class ReceiverPollBubbleModule {}
