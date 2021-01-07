import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverTextMessageBubbleComponent } from "./cometchat-receiver-text-message-bubble/cometchat-receiver-text-message-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverTextMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverTextMessageBubbleComponent],
})
export class CometchatReceiverTextMessageBubbleModule {}
