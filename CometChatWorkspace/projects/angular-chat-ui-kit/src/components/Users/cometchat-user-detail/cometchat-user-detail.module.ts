import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserDetailComponent } from "./cometchat-user-detail/cometchat-user-detail.component";
import { CometchatSharedMediaModule } from "../../Shared/cometchat-shared-media/cometchat-shared-media-view.module";

@NgModule({
  declarations: [CometchatUserDetailComponent],
  imports: [CommonModule, CometchatSharedMediaModule],
  exports: [CometchatUserDetailComponent],
})
export class CometchatUserDetailModule {}
