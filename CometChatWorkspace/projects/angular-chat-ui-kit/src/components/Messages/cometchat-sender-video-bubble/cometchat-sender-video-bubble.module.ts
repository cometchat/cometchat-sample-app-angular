import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderVideoBubbleComponent } from "./cometchat-sender-video-bubble/cometchat-sender-video-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatSenderVideoBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatSenderVideoBubbleComponent],
})
export class CometchatSenderVideoBubbleModule {}
