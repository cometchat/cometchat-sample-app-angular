import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserProfileComponent } from "./cometchat-user-profile/cometchat-user-profile.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatUserProfileComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatUserProfileComponent],
})
export class CometchatUserProfileModule {}
