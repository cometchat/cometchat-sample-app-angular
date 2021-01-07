import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderAudioMessageBubbleComponent } from "./cometchat-sender-audio-message-bubble/cometchat-sender-audio-message-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderAudioMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatReadRecieptModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderAudioMessageBubbleComponent],
})
export class CometchatSenderAudioMessageBubbleModule {}
