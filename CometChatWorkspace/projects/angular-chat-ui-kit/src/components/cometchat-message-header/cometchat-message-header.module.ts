import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageHeaderComponent } from "./cometchat-message-header/cometchat-message-header.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatMessageHeaderComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatMessageHeaderComponent],
})
export class CometchatMessageHeaderModule {}
