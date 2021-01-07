import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverImageMessageBubbleComponent } from "./cometchat-receiver-image-message-bubble/cometchat-receiver-image-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverImageMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatMessageActionsModule,
    CometchatAvatarModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatReadRecieptModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverImageMessageBubbleComponent],
})
export class CometchatReceiverImageMessageBubbleModule {}
