import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatBanMembersComponent } from "./cometchat-ban-members/cometchat-ban-members.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";
import { CometchatBanMemberViewModule } from "../cometchat-ban-member-view/ban-member-view.module";

@NgModule({
  declarations: [CometchatBanMembersComponent],
  imports: [
    CommonModule,
    CometchatBackdropModule,
    CometchatBanMemberViewModule,
  ],
  exports: [CometchatBanMembersComponent],
})
export class CometchatBanMembersModule {}
