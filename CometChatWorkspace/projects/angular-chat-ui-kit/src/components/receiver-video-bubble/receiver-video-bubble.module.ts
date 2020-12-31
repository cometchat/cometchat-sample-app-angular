import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverVideoBubbleComponent } from "./receiver-video-bubble/receiver-video-bubble.component";
import { AvatarModule } from "../avatar/avatar.module";
import { ToolTipModule } from "../tool-tip/tool-tip.module";

@NgModule({
  declarations: [ReceiverVideoBubbleComponent],
  imports: [CommonModule, AvatarModule, ToolTipModule],
  exports: [ReceiverVideoBubbleComponent],
})
export class ReceiverVideoBubbleModule {}
