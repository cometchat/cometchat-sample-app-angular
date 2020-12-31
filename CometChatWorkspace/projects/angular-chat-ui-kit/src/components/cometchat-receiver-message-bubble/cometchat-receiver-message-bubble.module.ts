import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverMessageBubbleComponent } from "./cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { CometchatReplyCountModule } from "../cometchat-reply-count/cometchat-reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverMessageBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    CometchatReplyCountModule,
    CometchatAvatarModule,
  ],
  exports: [CometchatReceiverMessageBubbleComponent],
})
export class CometchatReceiverMessageBubbleModule {}
