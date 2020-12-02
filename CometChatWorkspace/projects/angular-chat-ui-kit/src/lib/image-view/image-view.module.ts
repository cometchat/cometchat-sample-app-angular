import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageViewComponent } from "./image-view/image-view.component";
import { BackdropModule } from "../backdrop/backdrop.module";

@NgModule({
  declarations: [ImageViewComponent],
  imports: [CommonModule, BackdropModule],
  exports: [ImageViewComponent],
})
export class ImageViewModule {}
