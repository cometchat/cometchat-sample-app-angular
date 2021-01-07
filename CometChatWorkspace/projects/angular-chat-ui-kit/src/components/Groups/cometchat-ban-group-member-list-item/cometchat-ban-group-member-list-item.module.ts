import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatBanGroupMemberListItemComponent } from "./cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatBanMemberViewModule } from "../cometchat-ban-member-view/ban-member-view.module";

@NgModule({
  declarations: [CometchatBanGroupMemberListItemComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatBanMemberViewModule,
  ],
  exports: [CometchatBanGroupMemberListItemComponent],
})
export class CometchatBanGroupMemberListItemModule {}
