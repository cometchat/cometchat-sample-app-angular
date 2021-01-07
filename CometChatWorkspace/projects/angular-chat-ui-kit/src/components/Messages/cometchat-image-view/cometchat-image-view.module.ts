import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatImageViewComponent } from "./cometchat-image-view/cometchat-image-view.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [CometchatImageViewComponent],
  imports: [CommonModule, CometchatBackdropModule],
  exports: [CometchatImageViewComponent],
})
export class CometchatImageViewModule {}
