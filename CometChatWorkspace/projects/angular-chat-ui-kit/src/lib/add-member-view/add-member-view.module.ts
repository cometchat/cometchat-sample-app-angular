import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddMemberViewComponent } from "./add-member-view/add-member-view.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [AddMemberViewComponent],
  imports: [CommonModule, AvatarModule],
  exports: [AddMemberViewComponent],
})
export class AddMemberViewModule {}
