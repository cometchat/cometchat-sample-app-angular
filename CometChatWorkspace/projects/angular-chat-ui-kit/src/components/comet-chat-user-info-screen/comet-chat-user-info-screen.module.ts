import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserInfoScreenComponent } from "./comet-chat-user-info-screen/comet-chat-user-info-screen.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometChatUserInfoScreenComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometChatUserInfoScreenComponent],
})
export class CometChatUserInfoScreenModule {}
