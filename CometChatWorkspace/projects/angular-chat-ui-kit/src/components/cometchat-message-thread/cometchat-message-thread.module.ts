import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageThreadComponent } from "./cometchat-message-thread/cometchat-message-thread.component";
import { CometchatSenderMessageBubbleModule } from "../cometchat-sender-message-bubble/cometchat-sender-message-bubble.module";
import { CometchatMessageListModule } from "../cometchat-message-list/cometchat-message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { CometchatReceiverMessageBubbleModule } from "../cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { SenderFileBubbleModule } from "../sender-file-bubble/sender-file-bubble.module";
import { CometchatReceiverFileBubbleModule } from "../cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.module";
import { SenderImageBubbleModule } from "../sender-image-bubble/sender-image-bubble.module";
import { CometchatReceiverImageBubbleModule } from "../cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.module";
import { SenderVideoBubbleModule } from "../sender-video-bubble/sender-video-bubble.module";
import { CometchatReceiverVideoBubbleModule } from "../cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.module";
import { CometchatSenderAudioBubbleModule } from "../cometchat-sender-audio-bubble/cometchat-sender-audio-bubble.module";
import { CometchatReceiverAudioBubbleModule } from "../cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.module";
import { SenderStickerBubbleModule } from "../sender-sticker-bubble/sender-sticker-bubble.module";
import { CometchatReceiverStickerBubbleModule } from "../cometchat-receiver-sticker-bubble/cometchat-receiver-sticker-bubble.module";

@NgModule({
  declarations: [CometchatMessageThreadComponent],
  imports: [
    CommonModule,
    CometchatSenderMessageBubbleModule,
    CometchatReceiverMessageBubbleModule,
    SenderFileBubbleModule,
    CometchatReceiverFileBubbleModule,
    SenderImageBubbleModule,
    CometchatReceiverImageBubbleModule,
    CometchatSenderAudioBubbleModule,
    CometchatReceiverAudioBubbleModule,
    SenderVideoBubbleModule,
    CometchatReceiverVideoBubbleModule,
    CometchatMessageListModule,
    CometchatMessageComposerModule,
    SenderStickerBubbleModule,
    CometchatReceiverStickerBubbleModule,
  ],
  exports: [CometchatMessageThreadComponent],
})
export class CometchatMessageThreadModule {}
