import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverStickerBubbleComponent } from "./receiver-sticker-bubble/receiver-sticker-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverStickerBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    ReplyCountModule,
    CometchatAvatarModule,
    ReplyCountModule,
  ],
  exports: [ReceiverStickerBubbleComponent],
})
export class ReceiverStickerBubbleModule {}
