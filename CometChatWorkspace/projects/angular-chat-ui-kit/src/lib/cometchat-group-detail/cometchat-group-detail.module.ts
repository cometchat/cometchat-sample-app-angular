import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupDetailComponent } from "./cometchat-group-detail/cometchat-group-detail.component";
import { SharedMediaViewModule } from "../shared-media-view/shared-media-view.module";
import { CometchatViewMembersModule } from "../cometchat-view-members/cometchat-view-members.module";

@NgModule({
  declarations: [CometchatGroupDetailComponent],
  imports: [CommonModule, SharedMediaViewModule, CometchatViewMembersModule],
  exports: [CometchatGroupDetailComponent],
})
export class CometchatGroupDetailModule {}
