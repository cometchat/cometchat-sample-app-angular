import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedMediaViewComponent } from "./shared-media-view/shared-media-view.component";

@NgModule({
  declarations: [SharedMediaViewComponent],
  imports: [CommonModule],
  exports: [SharedMediaViewComponent],
})
export class SharedMediaViewModule {}
