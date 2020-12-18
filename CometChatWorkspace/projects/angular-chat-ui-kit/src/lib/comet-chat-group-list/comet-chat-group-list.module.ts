import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatGroupListComponent } from "./comet-chat-group-list/comet-chat-group-list.component";
import { GroupViewModule } from "../group-view/group-view.module";
import { CometChatCreateGroupModule } from "../comet-chat-create-group/comet-chat-create-group.module";

@NgModule({
  declarations: [CometChatGroupListComponent],
  imports: [CommonModule, GroupViewModule, CometChatCreateGroupModule],
  exports: [CometChatGroupListComponent],
})
export class CometChatGroupListModule {}
