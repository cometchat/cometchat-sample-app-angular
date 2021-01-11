import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatIncomingCallComponent } from "./cometchat-incoming-call/cometchat-incoming-call.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatIncomingCallComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatIncomingCallComponent],
})
export class CometchatIncomingCallModule {}
