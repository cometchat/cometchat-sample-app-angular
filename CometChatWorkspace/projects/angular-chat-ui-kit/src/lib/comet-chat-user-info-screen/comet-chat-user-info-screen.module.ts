import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserInfoScreenComponent } from "./comet-chat-user-info-screen/comet-chat-user-info-screen.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [CometChatUserInfoScreenComponent],
  imports: [CommonModule, AvatarModule],
  exports: [CometChatUserInfoScreenComponent],
})
export class CometChatUserInfoScreenModule {}
