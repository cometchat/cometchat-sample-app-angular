import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverAudioMessageBubbleComponent } from "./cometchat-receiver-audio-message-bubble/cometchat-receiver-audio-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverAudioMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatMessageActionsModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverAudioMessageBubbleComponent],
})
export class CometchatReceiverAudioMessageBubbleModule {}
