import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatBanMemberViewComponent } from "./cometchat-ban-member-view/cometchat-ban-member-view.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatBanMemberViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatBanMemberViewComponent],
})
export class CometchatBanMemberViewModule {}
