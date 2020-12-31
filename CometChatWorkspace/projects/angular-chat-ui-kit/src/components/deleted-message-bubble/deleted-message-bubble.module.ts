import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeletedMessageBubbleComponent } from "./deleted-message-bubble/deleted-message-bubble.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [DeletedMessageBubbleComponent],
  imports: [CommonModule, AvatarModule],
  exports: [DeletedMessageBubbleComponent],
})
export class DeletedMessageBubbleModule {}
