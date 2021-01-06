import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatCallAlertComponent } from "./cometchat-call-alert/cometchat-call-alert.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatCallAlertComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatCallAlertComponent],
})
export class CometchatCallAlertModule {}
