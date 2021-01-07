import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatIncomingCall } from "./cometchat-incoming-call/cometchat-incoming-call.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatIncomingCall],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatIncomingCall],
})
export class CometchatIncomingCallModule {}
