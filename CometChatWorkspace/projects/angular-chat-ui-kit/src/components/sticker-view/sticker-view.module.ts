import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StickerViewComponent } from "./sticker-view/sticker-view.component";

@NgModule({
  declarations: [StickerViewComponent],
  imports: [CommonModule],
  exports: [StickerViewComponent],
})
export class StickerViewModule {}
