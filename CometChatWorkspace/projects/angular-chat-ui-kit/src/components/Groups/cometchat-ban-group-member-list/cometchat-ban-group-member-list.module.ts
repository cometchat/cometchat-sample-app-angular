import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatBanGroupMemberListComponent } from "./cometchat-ban-group-member-list/cometchat-ban-group-member-list.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatBanGroupMemberListComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatBanGroupMemberListComponent],
})
export class CometchatBanGroupMemberListModule {}
