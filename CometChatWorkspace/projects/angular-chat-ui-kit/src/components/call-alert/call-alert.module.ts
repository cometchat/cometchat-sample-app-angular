import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallAlertComponent } from "./call-alert/call-alert.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CallAlertComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CallAlertComponent],
})
export class CallAlertModule {}
