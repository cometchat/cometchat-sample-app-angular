import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatConversationListComponent } from "./comet-chat-conversation-list/comet-chat-conversation-list.component";

@NgModule({
  declarations: [CometChatConversationListComponent],
  imports: [CommonModule],
  exports: [CometChatConversationListComponent],
})
export class CometChatConversationListModule {}
