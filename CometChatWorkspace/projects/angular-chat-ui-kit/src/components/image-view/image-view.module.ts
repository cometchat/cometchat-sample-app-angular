import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageViewComponent } from "./image-view/image-view.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [ImageViewComponent],
  imports: [CommonModule, CometchatBackdropModule],
  exports: [ImageViewComponent],
})
export class ImageViewModule {}
