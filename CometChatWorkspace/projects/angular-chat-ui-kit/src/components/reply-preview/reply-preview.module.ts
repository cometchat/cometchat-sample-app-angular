import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReplyPreviewComponent } from "./reply-preview/reply-preview.component";

@NgModule({
  declarations: [ReplyPreviewComponent],
  imports: [CommonModule],
  exports: [ReplyPreviewComponent],
})
export class ReplyPreviewModule {}
