import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupViewComponent } from "./group-view/group-view.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";
@NgModule({
  declarations: [GroupViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [GroupViewComponent],
})
export class GroupViewModule {}
