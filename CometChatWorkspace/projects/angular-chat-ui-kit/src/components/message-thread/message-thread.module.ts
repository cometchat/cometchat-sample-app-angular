import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageThreadComponent } from "./message-thread/message-thread.component";
import { CometchatSenderMessageBubbleModule } from "../cometchat-sender-message-bubble/cometchat-sender-message-bubble.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { CometchatReceiverMessageBubbleModule } from "../cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { SenderFileBubbleModule } from "../sender-file-bubble/sender-file-bubble.module";
import { ReceiverFileBubbleModule } from "../receiver-file-bubble/receiver-file-bubble.module";
import { SenderImageBubbleModule } from "../sender-image-bubble/sender-image-bubble.module";
import { ReceiverImageBubbleModule } from "../receiver-image-bubble/receiver-image-bubble.module";
import { SenderVideoBubbleModule } from "../sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "../receiver-video-bubble/receiver-video-bubble.module";
import { SenderAudioBubbleModule } from "../sender-audio-bubble/sender-audio-bubble.module";
import { ReceiverAudioBubbleModule } from "../receiver-audio-bubble/receiver-audio-bubble.module";
import { SenderStickerBubbleModule } from "../sender-sticker-bubble/sender-sticker-bubble.module";
import { ReceiverStickerBubbleModule } from "../receiver-sticker-bubble/receiver-sticker-bubble.module";

@NgModule({
  declarations: [MessageThreadComponent],
  imports: [
    CommonModule,
    CometchatSenderMessageBubbleModule,
    CometchatReceiverMessageBubbleModule,
    SenderFileBubbleModule,
    ReceiverFileBubbleModule,
    SenderImageBubbleModule,
    ReceiverImageBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    MessageListModule,
    CometchatMessageComposerModule,
    SenderStickerBubbleModule,
    ReceiverStickerBubbleModule,
  ],
  exports: [MessageThreadComponent],
})
export class MessageThreadModule {}
