import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { CometchatAvatarModule } from "./cometchat-avatar/cometchat-avatar.module";
import { CometChatUserContactListModule } from "./comet-chat-user-list/comet-chat-user-contact-list.module";
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
import { CometchatBackdropModule } from "./cometchat-backdrop/cometchat-backdrop.module";
import { SenderVideoBubbleModule } from "./sender-video-bubble/sender-video-bubble.module";
import { ReceiverVideoBubbleModule } from "./receiver-video-bubble/receiver-video-bubble.module";
import { CometChatUserDetailModule } from "./comet-chat-user-detail/comet-chat-user-detail.module";
import { SenderAudioBubbleModule } from "./sender-audio-bubble/sender-audio-bubble.module";
import { ReceiverAudioBubbleModule } from "./receiver-audio-bubble/receiver-audio-bubble.module";
import { DeletedMessageBubbleModule } from "./deleted-message-bubble/deleted-message-bubble.module";
import { ReplyPreviewModule } from "./reply-preview/reply-preview.module";
import { ReplyCountModule } from "./reply-count/reply-count.module";
import { SharedMediaViewModule } from "./shared-media-view/shared-media-view.module";
import { CometChatConversationListScreenModule } from "./comet-chat-conversation-list-screen/comet-chat-conversation-list-screen.module";
import { CometChatGroupListModule } from "./comet-chat-group-list/comet-chat-group-list.module";
import { GroupViewModule } from "./group-view/group-view.module";
import { CometChatCreateGroupModule } from "./comet-chat-create-group/comet-chat-create-group.module";
import { CometchatGroupListScreenModule } from "./cometchat-group-list-screen/cometchat-group-list-screen.module";
import { CometchatGroupDetailModule } from "./cometchat-group-detail/cometchat-group-detail.module";
import { CometchatViewMembersModule } from "./cometchat-view-members/cometchat-view-members.module";
import { MemberViewModule } from "./member-view/member-view.module";
import { CometchatAddMembersModule } from "./cometchat-add-members/cometchat-add-members.module";
import { CometChatBanMembersModule } from "./comet-chat-ban-members/comet-chat-ban-members.module";
import { CometchatBanMemberViewModule } from "./cometchat-ban-member-view/ban-member-view.module";
import { CreatePollViewModule } from "./create-poll-view/create-poll-view.module";
import { SenderPollBubbleModule } from "./sender-poll-bubble/sender-poll-bubble.module";
import { ReceiverPollBubbleModule } from "./receiver-poll-bubble/receiver-poll-bubble.module";
import { LiveReactionModule } from "./live-reaction/live-reaction.module";
import { StickerViewModule } from "./sticker-view/sticker-view.module";
import { SenderStickerBubbleModule } from "./sender-sticker-bubble/sender-sticker-bubble.module";
import { ReceiverStickerBubbleModule } from "./receiver-sticker-bubble/receiver-sticker-bubble.module";
import { CometchatCallAlertModule } from "./cometchat-call-alert/cometchat-call-alert.module";
import { CallScreenModule } from "./call-screen/call-screen.module";
import { CometchatCallMessageModule } from "./cometchat-call-message/call-message.module";
import { CometChatUnifiedModule } from "./comet-chat-unified/comet-chat-unified.module";
import { NavBarModule } from "./nav-bar/nav-bar.module";
@NgModule({
  declarations: [AngularChatUiKitComponent],
  imports: [
    CometChatUserContactListModule,
    CometchatAvatarModule,
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
    CometchatBackdropModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    CometChatUserDetailModule,
    DeletedMessageBubbleModule,
    ReplyPreviewModule,
    ReplyCountModule,
    SharedMediaViewModule,
    CometChatConversationListScreenModule,
    CometChatGroupListModule,
    GroupViewModule,
    CometChatCreateGroupModule,
    CometchatGroupListScreenModule,
    CometchatGroupDetailModule,
    CometchatViewMembersModule,
    MemberViewModule,
    CometchatAddMembersModule,
    CometChatBanMembersModule,
    CometchatBanMemberViewModule,
    CreatePollViewModule,
    SenderPollBubbleModule,
    ReceiverPollBubbleModule,
    LiveReactionModule,
    StickerViewModule,
    SenderStickerBubbleModule,
    ReceiverStickerBubbleModule,
    CometchatCallAlertModule,
    CallScreenModule,
    CometchatCallMessageModule,
    CometChatUnifiedModule,
    NavBarModule,
  ],
  exports: [
    AngularChatUiKitComponent,
    CometChatUserContactListModule,
    CometchatAvatarModule,
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
    CometchatBackdropModule,
    SenderVideoBubbleModule,
    ReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    ReceiverAudioBubbleModule,
    CometChatUserDetailModule,
    DeletedMessageBubbleModule,
    ReplyPreviewModule,
    ReplyCountModule,
    SharedMediaViewModule,
    CometChatConversationListScreenModule,
    CometChatGroupListModule,
    GroupViewModule,
    CometChatCreateGroupModule,
    CometchatGroupListScreenModule,
    CometchatGroupDetailModule,
    CometchatViewMembersModule,
    MemberViewModule,
    CometchatAddMembersModule,
    CometChatBanMembersModule,
    CometchatBanMemberViewModule,
    CreatePollViewModule,
    SenderPollBubbleModule,
    ReceiverPollBubbleModule,
    LiveReactionModule,
    StickerViewModule,
    SenderStickerBubbleModule,
    ReceiverStickerBubbleModule,
    CometchatCallAlertModule,
    CallScreenModule,
    CometchatCallMessageModule,
    CometChatUnifiedModule,
    NavBarModule,
  ],
})
export class AngularChatUiKitModule {}
