import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderStickerBubbleComponent } from "./cometchat-sender-sticker-bubble/cometchat-sender-sticker-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";

@NgModule({
  declarations: [CometchatSenderStickerBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    ToolTipModule,
    CometchatReplyCountModule,
  ],
  exports: [CometchatSenderStickerBubbleComponent],
})
export class CometchatSenderStickerBubbleModule {}
