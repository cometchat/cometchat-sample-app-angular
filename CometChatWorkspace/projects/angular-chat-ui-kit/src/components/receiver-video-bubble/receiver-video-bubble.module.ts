import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverVideoBubbleComponent } from "./receiver-video-bubble/receiver-video-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverVideoBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule, ToolTipModule],
  exports: [ReceiverVideoBubbleComponent],
})
export class ReceiverVideoBubbleModule {}
