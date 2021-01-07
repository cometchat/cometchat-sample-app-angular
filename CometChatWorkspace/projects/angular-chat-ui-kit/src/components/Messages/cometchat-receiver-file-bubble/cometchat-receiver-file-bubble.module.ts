import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverFileBubbleComponent } from "./cometchat-receiver-file-bubble/cometchat-receiver-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatMessageReactionsModule } from "../Extensions/cometchat-message-reactions/cometchat-message-reactions.module";

@NgModule({
  declarations: [CometchatReceiverFileBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatAvatarModule,
    CometchatReadRecieptModule,
    CometchatReplyCountModule,
    CometchatMessageReactionsModule,
  ],
  exports: [CometchatReceiverFileBubbleComponent],
})
export class CometchatReceiverFileBubbleModule {}
