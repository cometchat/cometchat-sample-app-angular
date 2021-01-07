import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListComponent } from "./cometchat-message-list/cometchat-message-list.component";
import { CometchatSenderMessageBubbleModule } from "../cometchat-sender-message-bubble/cometchat-sender-message-bubble.module";
import { CometchatReceiverMessageBubbleModule } from "../cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { CometchatSenderFileBubbleModule } from "../cometchat-sender-file-bubble/cometchat-sender-file-bubble.module";
import { CometchatReceiverFileBubbleModule } from "../cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.module";
import { CometchatSenderImageBubbleModule } from "../cometchat-sender-image-bubble/cometchat-sender-image-bubble.module";
import { CometchatReceiverImageBubbleModule } from "../cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.module";
import { CometchatSenderVideoBubbleModule } from "../cometchat-sender-video-bubble/cometchat-sender-video-bubble.module";
import { CometchatReceiverVideoBubbleModule } from "../cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.module";
import { CometchatSenderAudioBubbleModule } from "../cometchat-sender-audio-bubble/cometchat-sender-audio-bubble.module";
import { CometchatReceiverAudioBubbleModule } from "../cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.module";
import { CometchatDeletedMessageBubbleModule } from "../cometchat-deleted-message-bubble/cometchat-deleted-message-bubble.module";
import { CometchatSenderPollBubbleModule } from "../Extensions/cometchat-sender-poll-bubble/cometchat-sender-poll-bubble.module";
import { CometchatReceiverPollBubbleModule } from "../Extensions/cometchat-receiver-poll-bubble/cometchat-receiver-poll-bubble.module";
import { CometchatSenderStickerBubbleModule } from "../Extensions/cometchat-sender-sticker-bubble/cometchat-sender-sticker-bubble.module";
import { CometchatReceiverStickerBubbleModule } from "../Extensions/cometchat-receiver-sticker-bubble/cometchat-receiver-sticker-bubble.module";
import { CometchatCallMessageModule } from "../cometchat-call-message/call-message.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [CometchatMessageListComponent],
  imports: [
    CommonModule,
    CometchatSenderMessageBubbleModule,
    CometchatSenderFileBubbleModule,
    CometchatReceiverFileBubbleModule,
    CometchatSenderImageBubbleModule,
    CometchatReceiverImageBubbleModule,
    CometchatSenderVideoBubbleModule,
    CometchatReceiverVideoBubbleModule,
    CometchatSenderAudioBubbleModule,
    CometchatReceiverAudioBubbleModule,
    CometchatReceiverMessageBubbleModule,
    CometchatDeletedMessageBubbleModule,
    CometchatSenderPollBubbleModule,
    CometchatReceiverPollBubbleModule,
    CometchatSenderStickerBubbleModule,
    CometchatReceiverStickerBubbleModule,
    CometchatCallMessageModule,
  ],
  exports: [CometchatMessageListComponent],
  providers: [DatePipe],
})
export class CometchatMessageListModule {}
