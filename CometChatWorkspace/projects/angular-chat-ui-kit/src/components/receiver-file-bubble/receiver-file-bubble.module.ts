import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverFileBubbleComponent } from "./receiver-file-bubble/receiver-file-bubble.component";
import { ReadRecieptModule } from "../read-reciept/read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [ReceiverFileBubbleComponent],
  imports: [CommonModule, ToolTipModule, AvatarModule],
  exports: [ReceiverFileBubbleComponent],
})
export class ReceiverFileBubbleModule {}
