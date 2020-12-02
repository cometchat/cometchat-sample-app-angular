import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderVideoBubbleComponent } from "./sender-video-bubble/sender-video-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";

@NgModule({
  declarations: [SenderVideoBubbleComponent],
  imports: [CommonModule, ReadRecieptModule],
  exports: [SenderVideoBubbleComponent],
})
export class SenderVideoBubbleModule {}
