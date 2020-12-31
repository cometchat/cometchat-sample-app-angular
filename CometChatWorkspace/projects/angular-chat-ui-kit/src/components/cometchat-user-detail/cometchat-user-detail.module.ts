import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserDetailComponent } from "./cometchat-user-detail/cometchat-user-detail.component";
import { SharedMediaViewModule } from "../shared-media-view/shared-media-view.module";

@NgModule({
  declarations: [CometchatUserDetailComponent],
  imports: [CommonModule, SharedMediaViewModule],
  exports: [CometchatUserDetailComponent],
})
export class CometchatUserDetailModule {}
