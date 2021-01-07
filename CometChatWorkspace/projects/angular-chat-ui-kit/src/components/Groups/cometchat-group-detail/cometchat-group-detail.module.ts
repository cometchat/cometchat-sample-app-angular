import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailComponent } from "./cometchat-group-detail/cometchat-group-detail.component";
import { CometchatSharedMediaViewModule } from "../../Shared/cometchat-shared-media-view/cometchat-shared-media-view.module";
import { CometchatViewGroupMemberListModule } from "../cometchat-view-group-member-list/cometchat-view-group-member-list.module";
import { CometchatBanGroupMemberListItemModule } from "../cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.module";
import { CometchatAddGroupMemberListModule } from "../cometchat-add-group-member-list/cometchat-add-group-member-list.module";

@NgModule({
  declarations: [CometchatGroupDetailComponent],
  imports: [
    CommonModule,
    CometchatSharedMediaViewModule,
    CometchatViewGroupMemberListModule,
    CometchatBanGroupMemberListItemModule,
    CometchatAddGroupMemberListModule,
  ],
  exports: [CometchatGroupDetailComponent],
})
export class CometchatGroupDetailModule {}
