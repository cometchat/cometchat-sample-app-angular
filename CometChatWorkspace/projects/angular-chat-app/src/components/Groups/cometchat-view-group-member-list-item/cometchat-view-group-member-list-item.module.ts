import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewGroupMemberListItemComponent } from "./cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatViewGroupMemberListItemComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatViewGroupMemberListItemComponent],
})
export class CometchatViewGroupMemberListItemModule {}
