import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioBubbleComponent } from "./cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverAudioBubbleComponent],
  imports: [CommonModule, ToolTipModule, CometchatAvatarModule],
  exports: [CometchatReceiverAudioBubbleComponent],
})
export class CometchatReceiverAudioBubbleModule {}
