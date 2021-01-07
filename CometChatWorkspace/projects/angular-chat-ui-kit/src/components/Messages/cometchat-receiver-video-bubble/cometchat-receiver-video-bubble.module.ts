import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverVideoBubbleComponent } from "./cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverVideoBubbleComponent],
  imports: [
    CommonModule,
    CometchatAvatarModule,
    CometchatMessageActionsModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatReadRecieptModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverVideoBubbleComponent],
})
export class CometchatReceiverVideoBubbleModule {}
