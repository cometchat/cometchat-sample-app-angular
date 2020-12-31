import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderAudioBubbleComponent } from "./cometchat-sender-audio-bubble/cometchat-sender-audio-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";

@NgModule({
  declarations: [CometchatSenderAudioBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatReadRecieptModule],
  exports: [CometchatSenderAudioBubbleComponent],
})
export class CometchatSenderAudioBubbleModule {}
