import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderStickerBubbleComponent } from "./sender-sticker-bubble/sender-sticker-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";

@NgModule({
  declarations: [SenderStickerBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    ToolTipModule,
    ReplyCountModule,
  ],
  exports: [SenderStickerBubbleComponent],
})
export class SenderStickerBubbleModule {}
