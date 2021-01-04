import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderVideoBubbleComponent } from "./cometchat-sender-video-bubble/cometchat-sender-video-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";

@NgModule({
  declarations: [CometchatSenderVideoBubbleComponent],
  imports: [CommonModule, CometchatReadRecieptModule, CometchatToolTipModule],
  exports: [CometchatSenderVideoBubbleComponent],
})
export class CometchatSenderVideoBubbleModule {}
