import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewGroupMemberListComponent } from "./cometchat-view-group-member-list/cometchat-view-group-member-list.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatViewGroupMemberListItemModule } from "../cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.module";

@NgModule({
  declarations: [CometchatViewGroupMemberListComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatViewGroupMemberListItemModule,
  ],
  exports: [CometchatViewGroupMemberListComponent],
})
export class CometchatViewGroupMemberListModule {}
