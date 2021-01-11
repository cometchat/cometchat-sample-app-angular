import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailsComponent } from "./cometchat-group-details/cometchat-group-details.component";
import { CometchatSharedMediaModule } from "../../Shared/cometchat-shared-media/cometchat-shared-media-view.module";
import { CometchatViewGroupMemberListModule } from "../cometchat-view-group-member-list/cometchat-view-group-member-list.module";
import { CometchatBanGroupMemberListItemModule } from "../cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.module";
import { CometchatAddGroupMemberListModule } from "../cometchat-add-group-member-list/cometchat-add-group-member-list.module";

@NgModule({
  declarations: [CometchatGroupDetailsComponent],
  imports: [
    CommonModule,
    CometchatSharedMediaModule,
    CometchatViewGroupMemberListModule,
    CometchatBanGroupMemberListItemModule,
    CometchatAddGroupMemberListModule,
  ],
  exports: [CometchatGroupDetailsComponent],
})
export class CometchatGroupDetailsModule {}
