import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatViewMembersComponent } from "./cometchat-view-members/cometchat-view-members.component";
import { BackdropModule } from "../backdrop/backdrop.module";

@NgModule({
  declarations: [CometchatViewMembersComponent],
  imports: [CommonModule, BackdropModule],
  exports: [CometchatViewMembersComponent],
})
export class CometchatViewMembersModule {}
