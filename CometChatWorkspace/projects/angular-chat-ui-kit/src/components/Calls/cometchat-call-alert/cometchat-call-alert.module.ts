import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatIncomingCall as CometchatCallAlert } from "./cometchat-call-alert/cometchat-call-alert.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatCallAlert],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatCallAlert],
})
export class CometchatCallAlertModule {}
