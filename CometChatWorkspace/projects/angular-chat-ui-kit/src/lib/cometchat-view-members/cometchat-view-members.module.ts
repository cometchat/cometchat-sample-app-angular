import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewMembersComponent } from "./cometchat-view-members/cometchat-view-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";
import { MemberViewModule } from "../member-view/member-view.module";

@NgModule({
  declarations: [CometchatViewMembersComponent],
  imports: [CommonModule, BackdropModule, MemberViewModule],
  exports: [CometchatViewMembersComponent],
})
export class CometchatViewMembersModule {}
