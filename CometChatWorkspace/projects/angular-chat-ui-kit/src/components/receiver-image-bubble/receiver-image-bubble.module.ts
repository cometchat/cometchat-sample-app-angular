import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverImageBubbleComponent } from "./receiver-image-bubble/receiver-image-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [ReceiverImageBubbleComponent],
  imports: [
    CommonModule,
    ToolTipModule,
    CometchatAvatarModule,
    ReplyCountModule,
  ],
  exports: [ReceiverImageBubbleComponent],
})
export class ReceiverImageBubbleModule {}
