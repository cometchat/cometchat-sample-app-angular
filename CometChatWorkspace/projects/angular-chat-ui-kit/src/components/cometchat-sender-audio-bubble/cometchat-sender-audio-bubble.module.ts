import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderAudioBubbleComponent } from "./cometchat-sender-audio-bubble/cometchat-sender-audio-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";

@NgModule({
  declarations: [CometchatSenderAudioBubbleComponent],
  imports: [CommonModule, CometchatToolTipModule, CometchatReadRecieptModule],
  exports: [CometchatSenderAudioBubbleComponent],
})
export class CometchatSenderAudioBubbleModule {}
