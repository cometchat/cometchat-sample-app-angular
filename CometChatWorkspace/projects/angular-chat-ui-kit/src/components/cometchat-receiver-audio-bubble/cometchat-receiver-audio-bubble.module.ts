import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioBubbleComponent } from "./cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatRegularReactionViewModule } from "../cometchat-regular-reaction-view/cometchat-regular-reaction-view.module";

@NgModule({
  declarations: [CometchatReceiverAudioBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
    CometchatRegularReactionViewModule,
  ],
  exports: [CometchatReceiverAudioBubbleComponent],
})
export class CometchatReceiverAudioBubbleModule {}
