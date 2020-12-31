import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMemberViewComponent } from "./cometchat-add-member-view/cometchat-add-member-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [CometchatAddMemberViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [CometchatAddMemberViewComponent],
})
export class CometchatAddMemberViewModule {}
