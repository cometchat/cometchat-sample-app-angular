import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageThreadComponent } from "./cometchat-message-thread/cometchat-message-thread.component";
import { CometchatSenderTextMessageBubbleModule } from "../cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble.module";
import { CometchatMessageListModule } from "../cometchat-message-list/cometchat-message-list.module";
import { CometchatMessageComposerModule } from "../cometchat-message-composer/cometchat-message-composer.module";
import { CometchatReceiverTextMessageBubbleModule } from "../cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.module";
import { CometchatSenderFileMessageBubbleModule } from "../cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.module";
import { CometchatReceiverFileMessageBubbleModule } from "../cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.module";
import { CometchatSenderImageMessageBubbleModule } from "../cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble.module";
import { CometchatReceiverImageMessageBubbleModule } from "../cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.module";
import { CometchatSenderVideoMessageBubbleModule } from "../cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble.module";
import { CometchatReceiverVideoBubbleModule } from "../cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.module";
import { CometchatSenderAudioMessageBubbleModule } from "../cometchat-sender-audio-message-bubble/cometchat-sender-audio-message-bubble.module";
import { CometchatReceiverAudioMessageBubbleModule } from "../cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.module";
import { CometchatSenderStickerMessageBubbleModule } from "../Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.module";
import { CometchatReceiverStickerMessageBubbleModule } from "../Extensions/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.module";
import { CometchatSenderPollMessageBubbleModule } from "../Extensions/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.module";
import { CometchatReceiverPollMessageBubbleModule } from "../Extensions/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.module";

@NgModule({
  declarations: [CometchatMessageThreadComponent],
  imports: [
    CommonModule,
    CometchatSenderTextMessageBubbleModule,
    CometchatReceiverTextMessageBubbleModule,
    CometchatSenderFileMessageBubbleModule,
    CometchatReceiverFileMessageBubbleModule,
    CometchatSenderImageMessageBubbleModule,
    CometchatReceiverImageMessageBubbleModule,
    CometchatSenderAudioMessageBubbleModule,
    CometchatReceiverAudioMessageBubbleModule,
    CometchatSenderVideoMessageBubbleModule,
    CometchatReceiverVideoBubbleModule,
    CometchatMessageListModule,
    CometchatMessageComposerModule,
    CometchatSenderStickerMessageBubbleModule,
    CometchatReceiverStickerMessageBubbleModule,
    CometchatSenderPollMessageBubbleModule,
    CometchatReceiverPollMessageBubbleModule,
  ],
  exports: [CometchatMessageThreadComponent],
})
export class CometchatMessageThreadModule {}
