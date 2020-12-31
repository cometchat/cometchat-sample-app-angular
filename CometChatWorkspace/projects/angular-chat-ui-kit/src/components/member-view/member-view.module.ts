import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberViewComponent } from "./member-view/member-view.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [MemberViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [MemberViewComponent],
})
export class MemberViewModule {}
