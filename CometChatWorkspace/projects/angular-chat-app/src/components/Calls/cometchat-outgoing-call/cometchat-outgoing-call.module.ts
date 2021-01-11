import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatOutgoingCallComponent } from "./cometchat-outgoing-call/cometchat-outgoing-call.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatOutgoingCallComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatOutgoingCallComponent],
})
export class CometchatOutgoingCallModule {}
