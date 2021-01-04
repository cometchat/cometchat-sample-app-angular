import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverPollBubbleComponent } from "./cometchat-receiver-poll-bubble/cometchat-receiver-poll-bubble.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverPollBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatReceiverPollBubbleComponent],
})
export class CometchatReceiverPollBubbleModule {}
