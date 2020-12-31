import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverStickerBubbleComponent } from "./cometchat-receiver-sticker-bubble/cometchat-receiver-sticker-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverStickerBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatAvatarModule,
    CometchatReplyCountModule,
  ],
  exports: [CometchatReceiverStickerBubbleComponent],
})
export class CometchatReceiverStickerBubbleModule {}
