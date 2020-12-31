import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatReceiverImageBubbleComponent } from "./cometchat-receiver-image-bubble/cometchat-receiver-image-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatReceiverImageBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    CometchatAvatarModule,
    ReplyCountModule,
  ],
  exports: [CometchatReceiverImageBubbleComponent],
})
export class CometchatReceiverImageBubbleModule {}
