import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMembersComponent } from "./cometchat-add-members/cometchat-add-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";
import { AddMemberViewModule } from "../add-member-view/add-member-view.module";

@NgModule({
  declarations: [CometchatAddMembersComponent],
  imports: [CommonModule, BackdropModule, AddMemberViewModule],
  exports: [CometchatAddMembersComponent],
})
export class CometchatAddMembersModule {}
