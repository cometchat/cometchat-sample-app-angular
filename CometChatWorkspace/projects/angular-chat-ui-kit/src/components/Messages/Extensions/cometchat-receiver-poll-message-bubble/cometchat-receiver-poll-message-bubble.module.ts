import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverPollMessageBubbleComponent } from "./cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component";
import { CometchatAvatarModule } from "../../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReplyCountModule } from "../../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatReadRecieptModule } from "../../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatMessageReactionsModule } from "../cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatAvatarModule,
    CometchatReplyCountModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverPollMessageBubbleComponent],
})
export class CometchatReceiverPollMessageBubbleModule {}
