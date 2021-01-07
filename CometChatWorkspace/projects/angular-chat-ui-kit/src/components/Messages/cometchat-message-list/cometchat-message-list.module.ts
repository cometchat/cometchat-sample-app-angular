import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListComponent } from "./cometchat-message-list/cometchat-message-list.component";
import { CometchatSenderTextMessageBubbleModule } from "../cometchat-sender-text-message-bubble/cometchat-sender-text-message-bubble.module";
import { CometchatReceiverMessageBubbleModule } from "../cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { CometchatSenderFileMessageBubbleModule } from "../cometchat-sender-file-message-bubble/cometchat-sender-file-message-bubble.module";
import { CometchatReceiverFileMessageBubbleModule } from "../cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.module";
import { CometchatSenderImageMessageBubbleModule } from "../cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble.module";
import { CometchatReceiverImageMessageBubbleModule } from "../cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.module";
import { CometchatSenderVideoMessageBubbleModule } from "../cometchat-sender-video-message-bubble/cometchat-sender-video-message-bubble.module";
import { CometchatReceiverVideoBubbleModule } from "../cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.module";
import { CometchatSenderAudioMessageBubbleModule } from "../cometchat-sender-audio-message-bubble/cometchat-sender-audio-message-bubble.module";
import { CometchatReceiverAudioMessageBubbleModule } from "../cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.module";
import { CometchatDeleteMessageBubbleModule } from "../cometchat-delete-message-bubble/cometchat-delete-message-bubble.module";
import { CometchatSenderPollMessageBubbleModule } from "../Extensions/cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.module";
import { CometchatReceiverPollMessageBubbleModule } from "../Extensions/cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.module";
import { CometchatSenderStickerMessageBubbleModule } from "../Extensions/cometchat-sender-sticker-message-bubble/cometchat-sender-sticker-message-bubble.module";
import { CometchatReceiverStickerMessageBubbleModule } from "../Extensions/cometchat-receiver-sticker-message-bubble/cometchat-receiver-sticker-message-bubble.module";
import { CometchatCallMessageModule } from "../cometchat-call-message/call-message.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [CometchatMessageListComponent],
  imports: [
    CommonModule,
    CometchatSenderTextMessageBubbleModule,
    CometchatSenderFileMessageBubbleModule,
    CometchatReceiverFileMessageBubbleModule,
    CometchatSenderImageMessageBubbleModule,
    CometchatReceiverImageMessageBubbleModule,
    CometchatSenderVideoMessageBubbleModule,
    CometchatReceiverVideoBubbleModule,
    CometchatSenderAudioMessageBubbleModule,
    CometchatReceiverAudioMessageBubbleModule,
    CometchatReceiverMessageBubbleModule,
    CometchatDeleteMessageBubbleModule,
    CometchatSenderPollMessageBubbleModule,
    CometchatReceiverPollMessageBubbleModule,
    CometchatSenderStickerMessageBubbleModule,
    CometchatReceiverStickerMessageBubbleModule,
    CometchatCallMessageModule,
  ],
  exports: [CometchatMessageListComponent],
  providers: [DatePipe],
})
export class CometchatMessageListModule {}
