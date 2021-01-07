import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailComponent } from "./cometchat-group-detail/cometchat-group-detail.component";
import { CometchatSharedMediaViewModule } from "../../Shared/cometchat-shared-media-view/cometchat-shared-media-view.module";
import { CometchatViewGroupMemberListModule } from "../cometchat-view-group-member-list/cometchat-view-group-member-list.module";
import { CometchatBanMembersModule } from "../cometchat-ban-members/cometchat-ban-members.module";
import { CometchatAddMembersModule } from "../cometchat-add-members/cometchat-add-members.module";

@NgModule({
  declarations: [CometchatGroupDetailComponent],
  imports: [
    CommonModule,
    CometchatSharedMediaViewModule,
    CometchatViewGroupMemberListModule,
    CometchatBanMembersModule,
    CometchatAddMembersModule,
  ],
  exports: [CometchatGroupDetailComponent],
})
export class CometchatGroupDetailModule {}
