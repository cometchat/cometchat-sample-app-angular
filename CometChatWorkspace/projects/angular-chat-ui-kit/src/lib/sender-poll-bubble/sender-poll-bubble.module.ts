import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderPollBubbleComponent } from "./sender-poll-bubble/sender-poll-bubble.component";

@NgModule({
  declarations: [SenderPollBubbleComponent],
  imports: [CommonModule],
  exports: [SenderPollBubbleComponent],
})
export class SenderPollBubbleModule {}
