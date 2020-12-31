import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverPollBubbleComponent } from "./receiver-poll-bubble/receiver-poll-bubble.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [ReceiverPollBubbleComponent],
  imports: [CommonModule, AvatarModule],
  exports: [ReceiverPollBubbleComponent],
})
export class ReceiverPollBubbleModule {}
