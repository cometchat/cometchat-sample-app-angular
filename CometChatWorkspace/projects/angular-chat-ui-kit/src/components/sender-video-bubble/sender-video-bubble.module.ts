import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderVideoBubbleComponent } from "./sender-video-bubble/sender-video-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [SenderVideoBubbleComponent],
  imports: [CommonModule, CometchatReadRecieptModule, ToolTipModule],
  exports: [SenderVideoBubbleComponent],
})
export class SenderVideoBubbleModule {}
