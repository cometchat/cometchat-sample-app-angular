import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatAddMemberViewComponent } from "./cometchat-add-member-view/cometchat-add-member-view.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatAddMemberViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatAddMemberViewComponent],
})
export class CometchatAddMemberViewModule {}
