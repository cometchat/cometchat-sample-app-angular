import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserDetailComponent } from "./cometchat-user-detail/cometchat-user-detail.component";
import { CometchatSharedMediaViewModule } from "../cometchat-shared-media-view/cometchat-shared-media-view.module";

@NgModule({
  declarations: [CometchatUserDetailComponent],
  imports: [CommonModule, CometchatSharedMediaViewModule],
  exports: [CometchatUserDetailComponent],
})
export class CometchatUserDetailModule {}
