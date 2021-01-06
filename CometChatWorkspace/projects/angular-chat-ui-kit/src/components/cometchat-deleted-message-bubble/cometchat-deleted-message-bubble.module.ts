import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatDeletedMessageBubbleComponent } from "./cometchat-deleted-message-bubble/cometchat-deleted-message-bubble.component";

import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatDeletedMessageBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatDeletedMessageBubbleComponent],
})
export class CometchatDeletedMessageBubbleModule {}
