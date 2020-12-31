import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioBubbleComponent } from "./cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverAudioBubbleComponent],
  imports: [CommonModule, CometchatToolTipModule, CometchatAvatarModule],
  exports: [CometchatReceiverAudioBubbleComponent],
})
export class CometchatReceiverAudioBubbleModule {}
