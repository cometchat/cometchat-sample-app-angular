import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddGroupMemberListComponent } from "./cometchat-add-group-member-list/cometchat-add-group-member-list.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatAddGroupMemberListItemModule } from "../cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.module";

@NgModule({
  declarations: [CometchatAddGroupMemberListComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatAddGroupMemberListItemModule,
  ],
  exports: [CometchatAddGroupMemberListComponent],
})
export class CometchatAddGroupMemberListModule {}
