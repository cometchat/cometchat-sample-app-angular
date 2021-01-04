import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverMessageBubbleComponent } from "./cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";

@NgModule({
  declarations: [CometchatReceiverMessageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
  ],
  exports: [CometchatReceiverMessageBubbleComponent],
})
export class CometchatReceiverMessageBubbleModule {}
