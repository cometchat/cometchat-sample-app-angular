import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiverVideoBubbleComponent } from "./receiver-video-bubble/receiver-video-bubble.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [ReceiverVideoBubbleComponent],
  imports: [CommonModule, AvatarModule],
  exports: [ReceiverVideoBubbleComponent],
})
export class ReceiverVideoBubbleModule {}
