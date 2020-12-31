import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverStickerBubbleComponent } from "./cometchat-receiver-sticker-bubble/cometchat-receiver-sticker-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverStickerBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    ReplyCountModule,
    CometchatAvatarModule,
    ReplyCountModule,
  ],
  exports: [CometchatReceiverStickerBubbleComponent],
})
export class CometchatReceiverStickerBubbleModule {}
