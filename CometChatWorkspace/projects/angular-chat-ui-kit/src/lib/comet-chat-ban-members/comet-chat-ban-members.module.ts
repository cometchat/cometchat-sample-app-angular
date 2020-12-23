import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatBanMembersComponent } from "./comet-chat-ban-members/comet-chat-ban-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";
import { BanMemberViewModule } from "../ban-member-view/ban-member-view.module";

@NgModule({
  declarations: [CometChatBanMembersComponent],
  imports: [CommonModule, BackdropModule, BanMemberViewModule],
  exports: [CometChatBanMembersComponent],
})
export class CometChatBanMembersModule {}
