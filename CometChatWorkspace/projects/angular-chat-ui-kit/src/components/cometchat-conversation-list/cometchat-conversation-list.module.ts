import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListComponent } from "./cometchat-conversation-list/cometchat-conversation-list.component";
import { ConversationViewModule } from "../conversation-view/conversation-view.module";

@NgModule({
  declarations: [CometchatConversationListComponent],
  imports: [CommonModule, ConversationViewModule],
  exports: [CometchatConversationListComponent],
})
export class CometchatConversationListModule {}
