import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderFileBubbleComponent } from "./sender-file-bubble/sender-file-bubble.component";

@NgModule({
  declarations: [SenderFileBubbleComponent],
  imports: [CommonModule],
  exports: [SenderFileBubbleComponent],
})
export class SenderFileBubbleModule {}
