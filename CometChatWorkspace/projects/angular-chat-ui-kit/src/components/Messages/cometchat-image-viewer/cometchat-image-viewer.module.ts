import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatImageViewerComponent } from "./cometchat-image-viewer/cometchat-image-viewer.component";
import { CometchatBackdropModule } from "../../Shared/cometchat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [CometchatImageViewerComponent],
  imports: [CommonModule, CometchatBackdropModule],
  exports: [CometchatImageViewerComponent],
})
export class CometchatImageViewerModule {}
