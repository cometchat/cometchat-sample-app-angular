import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserDetailComponent } from "./comet-chat-user-detail/comet-chat-user-detail.component";

@NgModule({
  declarations: [CometChatUserDetailComponent],
  imports: [CommonModule],
  exports: [CometChatUserDetailComponent],
})
export class CometChatUserDetailModule {}
