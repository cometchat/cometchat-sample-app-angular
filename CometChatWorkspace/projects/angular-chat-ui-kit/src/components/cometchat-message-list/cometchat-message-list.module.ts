import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListComponent } from "./cometchat-message-list/cometchat-message-list.component";
import { CometchatSenderMessageBubbleModule } from "../cometchat-sender-message-bubble/cometchat-sender-message-bubble.module";
import { CometchatReceiverMessageBubbleModule } from "../cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { SenderFileBubbleModule } from "../sender-file-bubble/sender-file-bubble.module";
import { CometchatReceiverFileBubbleModule } from "../cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.module";
import { SenderImageBubbleModule } from "../sender-image-bubble/sender-image-bubble.module";
import { CometchatReceiverImageBubbleModule } from "../cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.module";
import { SenderVideoBubbleModule } from "../sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "../receiver-video-bubble/receiver-video-bubble.module";
import { SenderAudioBubbleModule } from "../sender-audio-bubble/sender-audio-bubble.module";
import { CometchatReceiverAudioBubbleModule } from "../cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.module";
import { CometchatDeletedMessageBubbleModule } from "../cometchat-deleted-message-bubble/cometchat-deleted-message-bubble.module";
import { SenderPollBubbleModule } from "../sender-poll-bubble/sender-poll-bubble.module";
import { CometchatReceiverPollBubbleModule } from "../cometchat-receiver-poll-bubble/cometchat-receiver-poll-bubble.module";
import { SenderStickerBubbleModule } from "../sender-sticker-bubble/sender-sticker-bubble.module";
import { ReceiverStickerBubbleModule } from "../receiver-sticker-bubble/receiver-sticker-bubble.module";
import { CometchatCallMessageModule } from "../cometchat-call-message/call-message.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [CometchatMessageListComponent],
  imports: [
    CommonModule,
    CometchatSenderMessageBubbleModule,
    SenderFileBubbleModule,
    CometchatReceiverFileBubbleModule,
    SenderImageBubbleModule,
    CometchatReceiverImageBubbleModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    CometchatReceiverAudioBubbleModule,
    CometchatReceiverMessageBubbleModule,
    CometchatDeletedMessageBubbleModule,
    SenderPollBubbleModule,
    CometchatReceiverPollBubbleModule,
    SenderStickerBubbleModule,
    ReceiverStickerBubbleModule,
    CometchatCallMessageModule,
  ],
  exports: [CometchatMessageListComponent],
  providers: [DatePipe],
})
export class CometchatMessageListModule {}
