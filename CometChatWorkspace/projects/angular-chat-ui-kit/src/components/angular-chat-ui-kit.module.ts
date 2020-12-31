import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { CometchatAvatarModule } from "./cometchat-avatar/cometchat-avatar.module";
import { CometchatUserListModule } from "./cometchat-user-list/cometchat-user-list.module";
import { CometchatConversationListModule } from "./cometchat-conversation-list/cometchat-conversation-list.module";
import { CometchatUserListScreenModule } from "./cometchat-user-list-screen/cometchat-user-list-screen.module";
import { CometchatMessageHeaderModule } from "./cometchat-message-header/cometchat-message-header.module";
import { CometchatMessageListScreenModule } from "./cometchat-message-list-screen/cometchat-message-list-screen.module";
import { CometchatMessageComposerModule } from "./cometchat-message-composer/cometchat-message-composer.module";
import { CometchatSenderMessageBubbleModule } from "./cometchat-sender-message-bubble/cometchat-sender-message-bubble.module";
import { CometchatReceiverMessageBubbleModule } from "./cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.module";
import { CometchatMessageListModule } from "./cometchat-message-list/cometchat-message-list.module";
import { CometchatReadRecieptModule } from "./cometchat-read-reciept/cometchat-read-reciept.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SenderFileBubbleModule } from "./sender-file-bubble/sender-file-bubble.module";
import { CometchatReceiverFileBubbleModule } from "./cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.module";
import { CometchatMessageThreadModule } from "./cometchat-message-thread/cometchat-message-thread.module";
import { ToolTipModule } from "./tool-tip/tool-tip.module";
import { SenderImageBubbleModule } from "./sender-image-bubble/sender-image-bubble.module";
import { CometchatReceiverImageBubbleModule } from "./cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.module";
import { CometchatBackdropModule } from "./cometchat-backdrop/cometchat-backdrop.module";
import { SenderVideoBubbleModule } from "./sender-video-bubble/sender-video-bubble.module";
import { CometchatReceiverVideoBubbleModule } from "./cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.module";
import { CometchatUserDetailModule } from "./cometchat-user-detail/cometchat-user-detail.module";
import { SenderAudioBubbleModule } from "./sender-audio-bubble/sender-audio-bubble.module";
import { CometchatReceiverAudioBubbleModule } from "./cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.module";
import { CometchatDeletedMessageBubbleModule } from "./cometchat-deleted-message-bubble/cometchat-deleted-message-bubble.module";
import { ReplyPreviewModule } from "./reply-preview/reply-preview.module";
import { CometchatReplyCountModule } from "./cometchat-reply-count/cometchat-reply-count.module";
import { SharedMediaViewModule } from "./shared-media-view/shared-media-view.module";
import { CometchatConversationListScreenModule } from "./cometchat-conversation-list-screen/cometchat-conversation-list-screen.module";
import { CometchatGroupListModule } from "./cometchat-group-list/cometchat-group-list.module";
import { CometchatGroupViewModule } from "./cometchat-group-view/cometchat-group-view.module";
import { CometchatCreateGroupModule } from "./cometchat-create-group/cometchat-create-group.module";
import { CometchatGroupListScreenModule } from "./cometchat-group-list-screen/cometchat-group-list-screen.module";
import { CometchatGroupDetailModule } from "./cometchat-group-detail/cometchat-group-detail.module";
import { CometchatViewMembersModule } from "./cometchat-view-members/cometchat-view-members.module";
import { CometchatMemberViewModule } from "./cometchat-member-view/cometchat-member-view.module";
import { CometchatAddMembersModule } from "./cometchat-add-members/cometchat-add-members.module";
import { CometchatBanMembersModule } from "./cometchat-ban-members/cometchat-ban-members.module";
import { CometchatBanMemberViewModule } from "./cometchat-ban-member-view/ban-member-view.module";
import { CometchatCreatePollViewModule } from "./cometchat-create-poll-view/cometchat-create-poll-view.module";
import { SenderPollBubbleModule } from "./sender-poll-bubble/sender-poll-bubble.module";
import { CometchatReceiverPollBubbleModule } from "./cometchat-receiver-poll-bubble/cometchat-receiver-poll-bubble.module";
import { CometchatLiveReactionModule } from "./cometchat-live-reaction/cometchat-live-reaction.module";
import { StickerViewModule } from "./sticker-view/sticker-view.module";
import { SenderStickerBubbleModule } from "./sender-sticker-bubble/sender-sticker-bubble.module";
import { CometchatReceiverStickerBubbleModule } from "./cometchat-receiver-sticker-bubble/cometchat-receiver-sticker-bubble.module";
import { CometchatCallAlertModule } from "./cometchat-call-alert/cometchat-call-alert.module";
import { CometchatCallScreenModule } from "./cometchat-call-screen/call-screen.module";
import { CometchatCallMessageModule } from "./cometchat-call-message/call-message.module";
import { CometchatUnifiedModule } from "./cometchat-unified/cometchat-unified.module";
import { CometchatNavBarModule } from "./cometchat-nav-bar/cometchat-nav-bar.module";
@NgModule({
  declarations: [AngularChatUiKitComponent],
  imports: [
    CometchatUserListModule,
    CometchatAvatarModule,
    CometchatConversationListModule,
    CometchatUserListScreenModule,
    CometchatMessageHeaderModule,
    CometchatMessageComposerModule,
    CometchatSenderMessageBubbleModule,
    CometchatReceiverMessageBubbleModule,
    CometchatMessageListModule,
    CometchatReadRecieptModule,
    BrowserAnimationsModule,
    SenderFileBubbleModule,
    CometchatReceiverFileBubbleModule,
    CometchatMessageThreadModule,
    ToolTipModule,
    SenderImageBubbleModule,
    CometchatReceiverImageBubbleModule,
    CometchatBackdropModule,
    SenderVideoBubbleModule,
    CometchatReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    CometchatReceiverAudioBubbleModule,
    CometchatUserDetailModule,
    CometchatDeletedMessageBubbleModule,
    ReplyPreviewModule,
    CometchatReplyCountModule,
    SharedMediaViewModule,
    CometchatConversationListScreenModule,
    CometchatGroupListModule,
    CometchatGroupViewModule,
    CometchatCreateGroupModule,
    CometchatGroupListScreenModule,
    CometchatGroupDetailModule,
    CometchatViewMembersModule,
    CometchatMemberViewModule,
    CometchatAddMembersModule,
    CometchatBanMembersModule,
    CometchatBanMemberViewModule,
    CometchatCreatePollViewModule,
    SenderPollBubbleModule,
    CometchatReceiverPollBubbleModule,
    CometchatLiveReactionModule,
    StickerViewModule,
    SenderStickerBubbleModule,
    CometchatReceiverStickerBubbleModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
    CometchatCallMessageModule,
    CometchatUnifiedModule,
    CometchatNavBarModule,
  ],
  exports: [
    AngularChatUiKitComponent,
    CometchatUserListModule,
    CometchatAvatarModule,
    CometchatConversationListModule,
    CometchatUserListScreenModule,
    CometchatMessageHeaderModule,
    CometchatMessageListScreenModule,
    CometchatMessageComposerModule,
    CometchatSenderMessageBubbleModule,
    CometchatReceiverMessageBubbleModule,
    CometchatMessageListModule,
    CometchatReadRecieptModule,
    SenderFileBubbleModule,
    CometchatReceiverFileBubbleModule,
    CometchatMessageThreadModule,
    ToolTipModule,
    SenderImageBubbleModule,
    CometchatReceiverImageBubbleModule,
    CometchatBackdropModule,
    SenderVideoBubbleModule,
    CometchatReceiverVideoBubbleModule,
    SenderAudioBubbleModule,
    CometchatReceiverAudioBubbleModule,
    CometchatUserDetailModule,
    CometchatDeletedMessageBubbleModule,
    ReplyPreviewModule,
    CometchatReplyCountModule,
    SharedMediaViewModule,
    CometchatConversationListScreenModule,
    CometchatGroupListModule,
    CometchatGroupViewModule,
    CometchatCreateGroupModule,
    CometchatGroupListScreenModule,
    CometchatGroupDetailModule,
    CometchatViewMembersModule,
    CometchatMemberViewModule,
    CometchatAddMembersModule,
    CometchatBanMembersModule,
    CometchatBanMemberViewModule,
    CometchatCreatePollViewModule,
    SenderPollBubbleModule,
    CometchatReceiverPollBubbleModule,
    CometchatLiveReactionModule,
    StickerViewModule,
    SenderStickerBubbleModule,
    CometchatReceiverStickerBubbleModule,
    CometchatCallAlertModule,
    CometchatCallScreenModule,
    CometchatCallMessageModule,
    CometchatUnifiedModule,
    CometchatNavBarModule,
  ],
})
export class AngularChatUiKitModule {}
