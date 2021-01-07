import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderStickerBubbleComponent } from "./cometchat-sender-sticker-bubble/cometchat-sender-sticker-bubble.component";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderStickerBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderStickerBubbleComponent],
})
export class CometchatSenderStickerBubbleModule {}
