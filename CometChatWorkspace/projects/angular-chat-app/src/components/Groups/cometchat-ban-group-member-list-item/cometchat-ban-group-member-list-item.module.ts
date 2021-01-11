import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatBanGroupMemberListItemComponent } from "./cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatBanGroupMemberListModule } from "../cometchat-ban-group-member-list/cometchat-ban-group-member-list.module";

@NgModule({
  declarations: [CometchatBanGroupMemberListItemComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatBanGroupMemberListModule,
  ],
  exports: [CometchatBanGroupMemberListItemComponent],
})
export class CometchatBanGroupMemberListItemModule {}
