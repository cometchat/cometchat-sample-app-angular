import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMembersComponent } from "./cometchat-add-members/cometchat-add-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";
import { CometchatAddMemberViewModule } from "../cometchat-add-member-view/cometchat-add-member-view.module";

@NgModule({
  declarations: [CometchatAddMembersComponent],
  imports: [CommonModule, BackdropModule, CometchatAddMemberViewModule],
  exports: [CometchatAddMembersComponent],
})
export class CometchatAddMembersModule {}
