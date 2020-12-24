import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MemberViewComponent } from "./member-view/member-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [MemberViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [MemberViewComponent],
})
export class MemberViewModule {}
