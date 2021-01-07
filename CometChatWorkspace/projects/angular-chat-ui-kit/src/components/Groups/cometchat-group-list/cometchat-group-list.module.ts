import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupListComponent } from "./cometchat-group-list/cometchat-group-list.component";
import { CometchatGroupListItemModule } from "../cometchat-group-list-item/cometchat-group-list-item.module";
import { CometchatCreateGroupModule } from "../cometchat-create-group/cometchat-create-group.module";

@NgModule({
  declarations: [CometchatGroupListComponent],
  imports: [
    CommonModule,
    CometchatGroupListItemModule,
    CometchatCreateGroupModule,
  ],
  exports: [CometchatGroupListComponent],
})
export class CometchatGroupListModule {}
