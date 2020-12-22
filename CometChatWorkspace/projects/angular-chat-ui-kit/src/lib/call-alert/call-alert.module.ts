import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallAlertComponent } from "./call-alert/call-alert.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [CallAlertComponent],
  imports: [CommonModule, AvatarModule],
  exports: [CallAlertComponent],
})
export class CallAlertModule {}
