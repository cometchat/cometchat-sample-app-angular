import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatGroupListComponent } from "./comet-chat-group-list/comet-chat-group-list.component";

@NgModule({
  declarations: [CometChatGroupListComponent],
  imports: [CommonModule],
  exports: [CometChatGroupListComponent],
})
export class CometChatGroupListModule {}
