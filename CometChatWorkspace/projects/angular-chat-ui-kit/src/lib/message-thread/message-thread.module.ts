import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageThreadComponent } from "./message-thread/message-thread.component";
import { CometChatSenderMessageBubbleModule } from "../comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.module";
import { MessageListModule } from "../message-list/message-list.module";
import { CometChatMessageComposerModule } from "../comet-chat-message-composer/comet-chat-message-composer.module";
import { CometChatReceiverMessageBubbleModule } from "../comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.module";
import { SenderFileBubbleModule } from "../sender-file-bubble/sender-file-bubble.module";
import { ReceiverFileBubbleModule } from "../receiver-file-bubble/receiver-file-bubble.module";
import { SenderImageBubbleModule } from "../sender-image-bubble/sender-image-bubble.module";
import { ReceiverImageBubbleModule } from "../receiver-image-bubble/receiver-image-bubble.module";
import { SenderVideoBubbleModule } from "../sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "../receiver-video-bubble/receiver-video-bubble.module";
import { SenderAudioBubbleModule } from "../sender-audio-bubble/sender-audio-bubble.module";
import { ReceiverAudioBubbleModule } from "../receiver-audio-bubble/receiver-audio-bubble.module";

@NgModule({
  declarations: [MessageThreadComponent],
  imports: [
    CommonModule,
    CometChatSenderMessageBubbleModule,
    CometChatReceiverMessageBubbleModule,
    SenderFileBubbleModule,
    ReceiverFileBubbleModule,
    SenderImageBubbleModule,
    ReceiverImageBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    MessageListModule,
    CometChatMessageComposerModule,
  ],
  exports: [MessageThreadComponent],
})
export class MessageThreadModule {}
