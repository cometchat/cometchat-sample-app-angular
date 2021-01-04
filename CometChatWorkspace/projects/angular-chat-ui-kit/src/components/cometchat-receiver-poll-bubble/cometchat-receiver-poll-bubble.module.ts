import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverPollBubbleComponent } from "./cometchat-receiver-poll-bubble/cometchat-receiver-poll-bubble.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";

@NgModule({
  declarations: [CometchatReceiverPollBubbleComponent],
  imports: [
    CommonModule,
    CometchatAvatarModule,
    CometchatReplyCountModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
  ],
  exports: [CometchatReceiverPollBubbleComponent],
})
export class CometchatReceiverPollBubbleModule {}
