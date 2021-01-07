import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderVideoMessageBubbleComponent } from "./cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderVideoMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatMessageActionsModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderVideoMessageBubbleComponent],
})
export class CometchatSenderVideoMessageBubbleModule {}
