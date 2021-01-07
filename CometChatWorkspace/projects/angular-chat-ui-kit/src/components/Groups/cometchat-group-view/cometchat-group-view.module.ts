import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatGroupViewComponent } from "./cometchat-group-view/cometchat-group-view.component";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
@NgModule({
  declarations: [CometchatGroupViewComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatGroupViewComponent],
})
export class CometchatGroupViewModule {}
