import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverPollBubbleComponent } from "./receiver-poll-bubble/receiver-poll-bubble.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverPollBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [ReceiverPollBubbleComponent],
})
export class ReceiverPollBubbleModule {}
