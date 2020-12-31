import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatConversationListComponent } from "./comet-chat-conversation-list/comet-chat-conversation-list.component";
import { ConversationViewModule } from "../conversation-view/conversation-view.module";

@NgModule({
  declarations: [CometChatConversationListComponent],
  imports: [CommonModule, ConversationViewModule],
  exports: [CometChatConversationListComponent],
})
export class CometChatConversationListModule {}
