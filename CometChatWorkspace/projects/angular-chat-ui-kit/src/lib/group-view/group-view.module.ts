import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupViewComponent } from "./group-view/group-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [GroupViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [GroupViewComponent],
})
export class GroupViewModule {}
