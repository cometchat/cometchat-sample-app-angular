import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverFileBubbleComponent } from "./cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverFileBubbleComponent],
  imports: [CommonModule, CometchatToolTipModule, CometchatAvatarModule],
  exports: [CometchatReceiverFileBubbleComponent],
})
export class CometchatReceiverFileBubbleModule {}
