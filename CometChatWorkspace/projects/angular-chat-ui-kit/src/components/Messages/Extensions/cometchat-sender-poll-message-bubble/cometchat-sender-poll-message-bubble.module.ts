import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderPollMessageBubbleComponent } from "./cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component";
import { CometchatToolTipModule } from "../../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatReplyCountModule } from "../../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderPollMessageBubbleComponent],
})
export class CometchatSenderPollMessageBubbleModule {}
