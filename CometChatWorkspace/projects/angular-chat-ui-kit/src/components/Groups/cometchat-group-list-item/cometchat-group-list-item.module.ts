import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupListItemComponent } from "./cometchat-group-list-item/cometchat-group-list-item.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
@NgModule({
  declarations: [CometchatGroupListItemComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatGroupListItemComponent],
})
export class CometchatGroupListItemModule {}
