import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderAudioBubbleComponent } from "./sender-audio-bubble/sender-audio-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";

@NgModule({
  declarations: [SenderAudioBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatReadRecieptModule],
  exports: [SenderAudioBubbleComponent],
})
export class SenderAudioBubbleModule {}
