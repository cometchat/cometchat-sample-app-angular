import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewMembersComponent } from "./cometchat-view-members/cometchat-view-members.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";
import { CometchatMemberViewModule } from "../cometchat-member-view/cometchat-member-view.module";

@NgModule({
  declarations: [CometchatViewMembersComponent],
  imports: [CommonModule, CometchatBackdropModule, CometchatMemberViewModule],
  exports: [CometchatViewMembersComponent],
})
export class CometchatViewMembersModule {}
