import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderImageBubbleComponent } from "./sender-image-bubble/sender-image-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";

@NgModule({
  declarations: [SenderImageBubbleComponent],
  imports: [CommonModule, ReadRecieptModule],
  exports: [SenderImageBubbleComponent],
})
export class SenderImageBubbleModule {}
