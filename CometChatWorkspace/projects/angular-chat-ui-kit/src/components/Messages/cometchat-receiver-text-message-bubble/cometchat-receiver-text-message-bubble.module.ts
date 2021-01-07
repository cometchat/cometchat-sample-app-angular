import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverTextMessageBubbleComponent } from "./cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component";
import { CometchatMessageActionsModule } from "../cometchat-message-actions/cometchat-message-actions.module";
import { CometchatThreadedMessageReplyCountModule } from "../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverTextMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatMessageActionsModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverTextMessageBubbleComponent],
})
export class CometchatReceiverTextMessageBubbleModule {}
