import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatCreateGroupComponent } from "./cometchat-create-group/cometchat-create-group.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [CometchatCreateGroupComponent],
  imports: [CommonModule, CometchatBackdropModule],
  exports: [CometchatCreateGroupComponent],
})
export class CometchatCreateGroupModule {}
