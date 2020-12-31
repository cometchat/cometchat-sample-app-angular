import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverVideoBubbleComponent } from "./cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverVideoBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule, ToolTipModule],
  exports: [CometchatReceiverVideoBubbleComponent],
})
export class CometchatReceiverVideoBubbleModule {}
