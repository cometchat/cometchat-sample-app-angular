import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverImageBubbleComponent } from "./receiver-image-bubble/receiver-image-bubble.component";
import { ToolTipModule } from "../tool-tip/tool-tip.module";
import { AvatarModule } from "../avatar/avatar.module";
import { ReplyCountModule } from "../reply-count/reply-count.module";

@NgModule({
  declarations: [ReceiverImageBubbleComponent],
  imports: [CommonModule, ToolTipModule, AvatarModule, ReplyCountModule],
  exports: [ReceiverImageBubbleComponent],
})
export class ReceiverImageBubbleModule {}
