import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioBubbleComponent } from "./cometchat-receiver-audio-bubble/cometchat-receiver-audio-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverAudioBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverAudioBubbleComponent],
})
export class CometchatReceiverAudioBubbleModule {}
