import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BanMemberViewComponent } from "./ban-member-view/ban-member-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [BanMemberViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [BanMemberViewComponent],
})
export class BanMemberViewModule {}
