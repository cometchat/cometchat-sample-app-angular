import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderStickerMessageBubbleComponent } from "./cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageActionsModule } from "../../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderStickerMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatMessageActionsModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderStickerMessageBubbleComponent],
})
export class CometchatSenderStickerMessageBubbleModule {}
