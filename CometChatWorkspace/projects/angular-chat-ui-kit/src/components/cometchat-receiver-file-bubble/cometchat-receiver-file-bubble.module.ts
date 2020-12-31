import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverFileBubbleComponent } from "./cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverFileBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatAvatarModule],
  exports: [CometchatReceiverFileBubbleComponent],
})
export class CometchatReceiverFileBubbleModule {}
