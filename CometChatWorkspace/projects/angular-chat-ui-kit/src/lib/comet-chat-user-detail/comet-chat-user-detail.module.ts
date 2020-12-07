import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserDetailComponent } from "./comet-chat-user-detail/comet-chat-user-detail.component";
import { SharedMediaViewModule } from "../shared-media-view/shared-media-view.module";

@NgModule({
  declarations: [CometChatUserDetailComponent],
  imports: [CommonModule, SharedMediaViewModule],
  exports: [CometChatUserDetailComponent],
})
export class CometChatUserDetailModule {}
