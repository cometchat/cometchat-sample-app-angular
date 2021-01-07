import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListComponent } from "./cometchat-conversation-list/cometchat-conversation-list.component";
import { CometchatConversationListItemModule } from "../cometchat-conversation-list-item/cometchat-conversation-list-item.module";

@NgModule({
  declarations: [CometchatConversationListComponent],
  imports: [CommonModule, CometchatConversationListItemModule],
  exports: [CometchatConversationListComponent],
})
export class CometchatConversationListModule {}
