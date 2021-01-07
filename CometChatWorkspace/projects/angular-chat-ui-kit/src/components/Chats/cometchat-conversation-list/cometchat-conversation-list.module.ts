import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatConversationListComponent } from "./cometchat-conversation-list/cometchat-conversation-list.component";
import { CometchatConversationViewModule } from "../cometchat-conversation-view/cometchat-conversation-view.module";

@NgModule({
  declarations: [CometchatConversationListComponent],
  imports: [CommonModule, CometchatConversationViewModule],
  exports: [CometchatConversationListComponent],
})
export class CometchatConversationListModule {}
