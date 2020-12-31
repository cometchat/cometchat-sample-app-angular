import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderFileBubbleComponent } from "./sender-file-bubble/sender-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [SenderFileBubbleComponent],
  imports: [CommonModule, CometchatReadRecieptModule, ToolTipModule],
  exports: [SenderFileBubbleComponent],
})
export class SenderFileBubbleModule {}
