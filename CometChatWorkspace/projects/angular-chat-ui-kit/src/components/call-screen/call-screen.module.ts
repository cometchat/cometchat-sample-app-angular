import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallScreenComponent } from "./call-screen/call-screen.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CallScreenComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CallScreenComponent],
})
export class CallScreenModule {}
