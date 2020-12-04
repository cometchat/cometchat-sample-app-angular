import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { AvatarModule } from "./avatar/avatar.module";
import { CometChatUserContactListModule } from "./comet-chat-user-list/comet-chat-user-contact-list.module";
import { CometChatUserContactListComponent } from "./comet-chat-user-list/comet-chat-user-contact-list/comet-chat-user-contact-list.component";
import { CometChatConversationListModule } from "./comet-chat-conversation-list/comet-chat-conversation-list.module";
import { CometchatUserListScreenModule } from "./cometchat-user-list-screen/cometchat-user-list-screen.module";
import { MessageHeaderModule } from "./message-header/message-header.module";
import { CometchatMessageListScreenModule } from "./cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometChatMessageComposerModule } from "./comet-chat-message-composer/comet-chat-message-composer.module";
import { CometChatSenderMessageBubbleModule } from "./comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.module";
import { CometChatReceiverMessageBubbleModule } from "./comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.module";
import { MessageListModule } from "./message-list/message-list.module";
import { ReadRecieptModule } from "./read-reciept/read-reciept.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SenderFileBubbleModule } from "./sender-file-bubble/sender-file-bubble.module";
import { ReceiverFileBubbleModule } from "./receiver-file-bubble/receiver-file-bubble.module";
import { MessageThreadModule } from "./message-thread/message-thread.module";
import { ToolTipModule } from "./tool-tip/tool-tip.module";
import { SenderImageBubbleModule } from "./sender-image-bubble/sender-image-bubble.module";
import { ReceiverImageBubbleModule } from "./receiver-image-bubble/receiver-image-bubble.module";
import { BackdropModule } from "./backdrop/backdrop.module";
import { SenderVideoBubbleModule } from "./sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "./receiver-video-bubble/receiver-video-bubble.module";
import { CometChatUserDetailModule } from "./comet-chat-user-detail/comet-chat-user-detail.module";
import { SenderAudioBubbleModule } from "./sender-audio-bubble/sender-audio-bubble.module";
import { ReceiverAudioBubbleModule } from "./receiver-audio-bubble/receiver-audio-bubble.module";
import { DeletedMessageBubbleModule } from "./deleted-message-bubble/deleted-message-bubble.module";
import { ReplyCountModule } from "./reply-count/reply-count.module";
@NgModule({
  declarations: [AngularChatUiKitComponent],
  imports: [
    CometChatUserContactListModule,
    AvatarModule,
    CometChatConversationListModule,
    CometchatUserListScreenModule,
    MessageHeaderModule,
    CometChatMessageComposerModule,
    CometChatSenderMessageBubbleModule,
    CometChatReceiverMessageBubbleModule,
    MessageListModule,
    ReadRecieptModule,
    BrowserAnimationsModule,
    SenderFileBubbleModule,
    ReceiverFileBubbleModule,
    MessageThreadModule,
    ToolTipModule,
    SenderImageBubbleModule,
    ReceiverImageBubbleModule,
    BackdropModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    CometChatUserDetailModule,
    DeletedMessageBubbleModule,
    ReplyCountModule,
  ],
  exports: [
    AngularChatUiKitComponent,
    CometChatUserContactListModule,
    AvatarModule,
    CometChatConversationListModule,
    CometchatUserListScreenModule,
    MessageHeaderModule,
    CometchatMessageListScreenModule,
    CometChatMessageComposerModule,
    CometChatSenderMessageBubbleModule,
    CometChatReceiverMessageBubbleModule,
    MessageListModule,
    ReadRecieptModule,
    SenderFileBubbleModule,
    ReceiverFileBubbleModule,
    MessageThreadModule,
    ToolTipModule,
    SenderImageBubbleModule,
    ReceiverImageBubbleModule,
    BackdropModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    CometChatUserDetailModule,
    DeletedMessageBubbleModule,
    ReplyCountModule,
  ],
})
export class AngularChatUiKitModule {}
