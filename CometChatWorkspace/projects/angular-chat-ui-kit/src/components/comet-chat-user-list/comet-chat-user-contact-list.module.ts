import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list/comet-chat-user-contact-list.component";

import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [CometChatUserContactListComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [CometChatUserContactListComponent],
})
export class CometChatUserContactListModule {}
