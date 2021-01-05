import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverImageBubbleComponent } from "./cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.component";
import { CometchatToolTipModule } from "../cometchat-tool-tip/cometchat-tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";
import { CometchatReadRecieptModule } from "../cometchat-read-reciept/cometchat-read-reciept.module";
import { CometchatRegularReactionViewModule } from "../cometchat-regular-reaction-view/cometchat-regular-reaction-view.module";

@NgModule({
  declarations: [CometchatReceiverImageBubbleComponent],
  imports: [
    CommonModule,
    CometchatToolTipModule,
    CometchatAvatarModule,
    CometchatReplyCountModule,
    CometchatReadRecieptModule,
    CometchatRegularReactionViewModule,
  ],
  exports: [CometchatReceiverImageBubbleComponent],
})
export class CometchatReceiverImageBubbleModule {}
