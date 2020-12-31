import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageListComponent } from "./message-list/message-list.component";
import { CometChatSenderMessageBubbleModule } from "../comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.module";
import { CometChatReceiverMessageBubbleModule } from "../comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.module";
import { SenderFileBubbleModule } from "../sender-file-bubble/sender-file-bubble.module";
import { ReceiverFileBubbleModule } from "../receiver-file-bubble/receiver-file-bubble.module";
import { SenderImageBubbleModule } from "../sender-image-bubble/sender-image-bubble.module";
import { ReceiverImageBubbleModule } from "../receiver-image-bubble/receiver-image-bubble.module";
import { SenderVideoBubbleModule } from "../sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "../receiver-video-bubble/receiver-video-bubble.module";
import { SenderAudioBubbleModule } from "../sender-audio-bubble/sender-audio-bubble.module";
import { ReceiverAudioBubbleModule } from "../receiver-audio-bubble/receiver-audio-bubble.module";
import { DeletedMessageBubbleModule } from "../deleted-message-bubble/deleted-message-bubble.module";
import { SenderPollBubbleModule } from "../sender-poll-bubble/sender-poll-bubble.module";
import { ReceiverPollBubbleModule } from "../receiver-poll-bubble/receiver-poll-bubble.module";
import { SenderStickerBubbleModule } from "../sender-sticker-bubble/sender-sticker-bubble.module";
import { ReceiverStickerBubbleModule } from "../receiver-sticker-bubble/receiver-sticker-bubble.module";
import { CometchatCallMessageModule } from "../cometchat-call-message/call-message.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [MessageListComponent],
  imports: [
    CommonModule,
    CometChatSenderMessageBubbleModule,
    SenderFileBubbleModule,
    ReceiverFileBubbleModule,
    SenderImageBubbleModule,
    ReceiverImageBubbleModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    CometChatReceiverMessageBubbleModule,
    DeletedMessageBubbleModule,
    SenderPollBubbleModule,
    ReceiverPollBubbleModule,
    SenderStickerBubbleModule,
    ReceiverStickerBubbleModule,
    CometchatCallMessageModule,
  ],
  exports: [MessageListComponent],
  providers: [DatePipe],
})
export class MessageListModule {}
