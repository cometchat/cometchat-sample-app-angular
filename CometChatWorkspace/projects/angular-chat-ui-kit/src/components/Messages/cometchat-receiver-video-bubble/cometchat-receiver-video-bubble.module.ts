import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverVideoBubbleComponent } from "./cometchat-receiver-video-bubble/cometchat-receiver-video-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverVideoBubbleComponent],
  imports: [
    CommonModule,
    CometchatAvatarModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatReadRecieptModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverVideoBubbleComponent],
})
export class CometchatReceiverVideoBubbleModule {}
