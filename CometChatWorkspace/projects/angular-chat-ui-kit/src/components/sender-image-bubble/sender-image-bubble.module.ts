import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderImageBubbleComponent } from "./sender-image-bubble/sender-image-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";

@NgModule({
  declarations: [SenderImageBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    ToolTipModule,
    CometchatReplyCountModule,
  ],
  exports: [SenderImageBubbleComponent],
})
export class SenderImageBubbleModule {}
