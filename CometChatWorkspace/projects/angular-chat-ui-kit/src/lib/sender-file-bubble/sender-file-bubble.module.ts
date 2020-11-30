import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderFileBubbleComponent } from "./sender-file-bubble/sender-file-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";

@NgModule({
  declarations: [SenderFileBubbleComponent],
  imports: [CommonModule, ReadRecieptModule],
  exports: [SenderFileBubbleComponent],
})
export class SenderFileBubbleModule {}
