import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioMessageBubbleComponent } from "./cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverAudioMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverAudioMessageBubbleComponent],
})
export class CometchatReceiverAudioMessageBubbleModule {}
