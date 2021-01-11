import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddGroupMemberListItemComponent } from "./cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatAddGroupMemberListItemComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatAddGroupMemberListItemComponent],
})
export class CometchatAddGroupMemberListItemModule {}
