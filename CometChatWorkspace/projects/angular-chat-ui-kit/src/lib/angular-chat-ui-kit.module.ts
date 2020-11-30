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
  ],
})
export class AngularChatUiKitModule {}
