import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderFileBubbleComponent } from "./cometchat-sender-file-bubble/cometchat-sender-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [CometchatSenderFileBubbleComponent],
  imports: [CommonModule, CometchatReadRecieptModule, ToolTipModule],
  exports: [CometchatSenderFileBubbleComponent],
})
export class CometchatSenderFileBubbleModule {}
