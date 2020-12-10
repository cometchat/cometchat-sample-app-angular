import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverPollBubbleComponent } from "./receiver-poll-bubble/receiver-poll-bubble.component";

@NgModule({
  declarations: [ReceiverPollBubbleComponent],
  imports: [CommonModule],
  exports: [ReceiverPollBubbleComponent],
})
export class ReceiverPollBubbleModule {}
