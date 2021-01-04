import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserInfoScreenComponent } from "./cometchat-user-info-screen/cometchat-user-info-screen.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatUserInfoScreenComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatUserInfoScreenComponent],
})
export class CometchatUserInfoScreenModule {}
