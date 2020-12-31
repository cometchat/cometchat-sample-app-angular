import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverFileBubbleComponent } from "./receiver-file-bubble/receiver-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverFileBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatAvatarModule],
  exports: [ReceiverFileBubbleComponent],
})
export class ReceiverFileBubbleModule {}
