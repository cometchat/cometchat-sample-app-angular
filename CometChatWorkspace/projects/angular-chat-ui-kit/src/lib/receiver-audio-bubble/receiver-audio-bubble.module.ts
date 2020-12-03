import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverAudioBubbleComponent } from "./receiver-audio-bubble/receiver-audio-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [ReceiverAudioBubbleComponent],
  imports: [CommonModule, ToolTipModule, AvatarModule],
  exports: [ReceiverAudioBubbleComponent],
})
export class ReceiverAudioBubbleModule {}
