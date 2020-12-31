import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupListComponent } from "./cometchat-group-list/cometchat-group-list.component";
import { GroupViewModule } from "../group-view/group-view.module";
import { CometchatCreateGroupModule } from "../cometchat-create-group/cometchat-create-group.module";

@NgModule({
  declarations: [CometchatGroupListComponent],
  imports: [CommonModule, GroupViewModule, CometchatCreateGroupModule],
  exports: [CometchatGroupListComponent],
})
export class CometchatGroupListModule {}
