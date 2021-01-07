import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMembersComponent } from "./cometchat-add-members/cometchat-add-members.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatAddGroupMemberListItemModule } from "../cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.module";

@NgModule({
  declarations: [CometchatAddMembersComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatAddGroupMemberListItemModule,
  ],
  exports: [CometchatAddMembersComponent],
})
export class CometchatAddMembersModule {}
