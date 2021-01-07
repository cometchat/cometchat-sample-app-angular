import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderStickerMessageBubbleComponent } from "./cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.component";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderStickerMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderStickerMessageBubbleComponent],
})
export class CometchatSenderStickerMessageBubbleModule {}
