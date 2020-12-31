import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderStickerBubbleComponent } from "./sender-sticker-bubble/sender-sticker-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";

@NgModule({
  declarations: [SenderStickerBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    ToolTipModule,
    CometchatReplyCountModule,
  ],
  exports: [SenderStickerBubbleComponent],
})
export class SenderStickerBubbleModule {}
