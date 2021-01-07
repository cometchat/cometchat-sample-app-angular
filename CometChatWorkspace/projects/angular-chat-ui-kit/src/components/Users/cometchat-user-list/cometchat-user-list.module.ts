import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserListComponent } from "./cometchat-user-list/cometchat-user-list.component";

import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatUserListComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatUserListComponent],
})
export class CometchatUserListModule {}
