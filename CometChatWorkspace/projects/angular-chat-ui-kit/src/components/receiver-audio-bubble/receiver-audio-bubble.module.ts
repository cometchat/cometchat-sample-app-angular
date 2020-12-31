import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverAudioBubbleComponent } from "./receiver-audio-bubble/receiver-audio-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverAudioBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatAvatarModule],
  exports: [ReceiverAudioBubbleComponent],
})
export class ReceiverAudioBubbleModule {}
