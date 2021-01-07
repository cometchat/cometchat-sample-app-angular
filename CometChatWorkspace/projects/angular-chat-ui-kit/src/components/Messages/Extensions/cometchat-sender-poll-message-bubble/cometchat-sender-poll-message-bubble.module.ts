import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderPollMessageBubbleComponent } from "./cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component";
import { CometchatMessageActionsModule } from "../../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatThreadedMessageReplyCountModule } from "../../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatMessageActionsModule,
    CometchatReadRecieptModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderPollMessageBubbleComponent],
})
export class CometchatSenderPollMessageBubbleModule {}
