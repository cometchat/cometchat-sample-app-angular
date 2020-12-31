import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverMessageBubbleComponent } from "./cometchat-receiver-message-bubble/cometchat-receiver-message-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverMessageBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    ReplyCountModule,
    CometchatAvatarModule,
  ],
  exports: [CometchatReceiverMessageBubbleComponent],
})
export class CometchatReceiverMessageBubbleModule {}
