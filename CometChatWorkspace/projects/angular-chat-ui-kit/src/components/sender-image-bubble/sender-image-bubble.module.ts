import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SenderImageBubbleComponent } from "./sender-image-bubble/sender-image-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";

@NgModule({
  declarations: [SenderImageBubbleComponent],
  imports: [CommonModule, ReadRecieptModule, ToolTipModule, ReplyCountModule],
  exports: [SenderImageBubbleComponent],
})
export class SenderImageBubbleModule {}
