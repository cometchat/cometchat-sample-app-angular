import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserDetailsComponent } from "./cometchat-user-details/cometchat-user-details.component";
import { CometchatSharedMediaModule } from "../../Shared/cometchat-shared-media/cometchat-shared-media-view.module";

@NgModule({
  declarations: [CometchatUserDetailsComponent],
  imports: [CommonModule, CometchatSharedMediaModule],
  exports: [CometchatUserDetailsComponent],
})
export class CometchatUserDetailsModule {}
