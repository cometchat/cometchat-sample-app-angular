import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatSenderFileBubbleComponent } from "./cometchat-sender-file-bubble/cometchat-sender-file-bubble.component";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatRegularReactionViewModule } from "../cometchat-regular-reaction-view/cometchat-regular-reaction-view.module";

@NgModule({
  declarations: [CometchatSenderFileBubbleComponent],
  imports: [
    CommonModule,
    CometchatReadRecieptModule,
    CometchatToolTipModule,
    CometchatReplyCountModule,
    CometchatRegularReactionViewModule,
  ],
  exports: [CometchatSenderFileBubbleComponent],
})
export class CometchatSenderFileBubbleModule {}
