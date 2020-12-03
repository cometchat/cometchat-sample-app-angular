import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeletedMessageBubbleComponent } from "./deleted-message-bubble/deleted-message-bubble.component";

@NgModule({
  declarations: [DeletedMessageBubbleComponent],
  imports: [CommonModule],
  exports: [DeletedMessageBubbleComponent],
})
export class DeletedMessageBubbleModule {}
