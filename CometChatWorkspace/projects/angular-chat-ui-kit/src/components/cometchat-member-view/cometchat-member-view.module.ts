import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMemberViewComponent } from "./cometchat-member-view/cometchat-member-view.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatMemberViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatMemberViewComponent],
})
export class CometchatMemberViewModule {}
