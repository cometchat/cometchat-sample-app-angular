import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewMembersComponent } from "./cometchat-view-members/cometchat-view-members.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatViewGroupMemberListItemModule } from "../cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.module";

@NgModule({
  declarations: [CometchatViewMembersComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatViewGroupMemberListItemModule,
  ],
  exports: [CometchatViewMembersComponent],
})
export class CometchatViewMembersModule {}
