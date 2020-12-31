import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMembersComponent } from "./cometchat-add-members/cometchat-add-members.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";
import { CometchatAddMemberViewModule } from "../cometchat-add-member-view/cometchat-add-member-view.module";

@NgModule({
  declarations: [CometchatAddMembersComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatAddMemberViewModule,
  ],
  exports: [CometchatAddMembersComponent],
})
export class CometchatAddMembersModule {}
