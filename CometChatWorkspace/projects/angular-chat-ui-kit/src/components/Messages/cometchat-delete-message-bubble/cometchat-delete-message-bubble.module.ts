import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatDeleteMessageBubbleComponent } from "./cometchat-delete-message-bubble/cometchat-delete-message-bubble.component";

import { CometchatAvatarModule } from "../../Shared/cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometchatDeleteMessageBubbleComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometchatDeleteMessageBubbleComponent],
})
export class CometchatDeleteMessageBubbleModule {}
