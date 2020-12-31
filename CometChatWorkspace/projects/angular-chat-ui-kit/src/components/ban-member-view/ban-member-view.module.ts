import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanMemberViewComponent } from "./ban-member-view/ban-member-view.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [BanMemberViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [BanMemberViewComponent],
})
export class BanMemberViewModule {}
