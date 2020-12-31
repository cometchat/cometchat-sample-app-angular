import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeletedMessageBubbleComponent } from "./deleted-message-bubble/deleted-message-bubble.component";

import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [DeletedMessageBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [DeletedMessageBubbleComponent],
})
export class DeletedMessageBubbleModule {}
