import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailComponent } from "./cometchat-group-detail/cometchat-group-detail.component";
import { SharedMediaViewModule } from "../shared-media-view/shared-media-view.module";
import { CometchatViewMembersModule } from "../cometchat-view-members/cometchat-view-members.module";
import { CometchatBanMembersModule } from "../cometchat-ban-members/comet-chat-ban-members.module";
import { CometchatAddMembersModule } from "../cometchat-add-members/cometchat-add-members.module";

@NgModule({
  declarations: [CometchatGroupDetailComponent],
  imports: [
    CommonModule,
    SharedMediaViewModule,
    CometchatViewMembersModule,
    CometchatBanMembersModule,
    CometchatAddMembersModule,
  ],
  exports: [CometchatGroupDetailComponent],
})
export class CometchatGroupDetailModule {}
