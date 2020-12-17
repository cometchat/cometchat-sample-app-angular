import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailComponent } from "./cometchat-group-detail/cometchat-group-detail.component";
import { SharedMediaViewModule } from "../shared-media-view/shared-media-view.module";
import { CometchatViewMembersModule } from "../cometchat-view-members/cometchat-view-members.module";
import { CometChatBanMembersModule } from "../comet-chat-ban-members/comet-chat-ban-members.module";

@NgModule({
  declarations: [CometchatGroupDetailComponent],
  imports: [
    CommonModule,
    SharedMediaViewModule,
    CometchatViewMembersModule,
    CometChatBanMembersModule,
  ],
  exports: [CometchatGroupDetailComponent],
})
export class CometchatGroupDetailModule {}
