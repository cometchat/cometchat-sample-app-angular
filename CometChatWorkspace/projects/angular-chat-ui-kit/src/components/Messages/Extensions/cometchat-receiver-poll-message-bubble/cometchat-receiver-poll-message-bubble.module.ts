import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverPollMessageBubbleComponent } from "./cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component";
import { CometchatAvatarModule } from "../../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatThreadedMessageReplyCountModule } from "../../cometchat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatAvatarModule,
    CometchatThreadedMessageReplyCountModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverPollMessageBubbleComponent],
})
export class CometchatReceiverPollMessageBubbleModule {}
