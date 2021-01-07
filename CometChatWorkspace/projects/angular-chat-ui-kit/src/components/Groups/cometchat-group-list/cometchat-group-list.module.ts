import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupListComponent } from "./cometchat-group-list/cometchat-group-list.component";
import { CometchatGroupViewModule } from "../cometchat-group-view/cometchat-group-view.module";
import { CometchatCreateGroupModule } from "../cometchat-create-group/cometchat-create-group.module";

@NgModule({
  declarations: [CometchatGroupListComponent],
  imports: [CommonModule, CometchatGroupViewModule, CometchatCreateGroupModule],
  exports: [CometchatGroupListComponent],
})
export class CometchatGroupListModule {}
