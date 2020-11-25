import { NgModule } from "@angular/core";
import { AngularChatUiKitComponent } from "./angular-chat-ui-kit.component";
import { AvatarModule } from "./avatar/avatar.module";
import { CometChatUserContactListModule } from "./comet-chat-user-contact-list/comet-chat-user-contact-list.module";
import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list/comet-chat-user-contact-list/comet-chat-user-contact-list.component";
import { CometChatConversationListModule } from "./comet-chat-conversation-list/comet-chat-conversation-list.module";
import { CometChatMessageComposerModule } from "./comet-chat-message-composer/comet-chat-message-composer.module";
import { CometChatSenderMessageBubbleModule } from "./comet-chat-sender-message-bubble/comet-chat-sender-message-bubble.module";
import { CometChatReceiverMessageBubbleModule } from "./comet-chat-receiver-message-bubble/comet-chat-receiver-message-bubble.module";
@NgModule({
  declarations: [AngularChatUiKitComponent],
  imports: [
    CometChatUserContactListModule,
    AvatarModule,
    CometChatMessageComposerModule,
    CometChatSenderMessageBubbleModule,
    CometChatReceiverMessageBubbleModule,
  ],
  exports: [
    AngularChatUiKitComponent,
    CometChatUserContactListModule,
    AvatarModule,
    CometChatConversationListModule,
    CometChatMessageComposerModule,
    CometChatSenderMessageBubbleModule,
    CometChatReceiverMessageBubbleModule,
  ],
})
export class AngularChatUiKitModule {}
