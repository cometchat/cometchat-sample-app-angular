import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list/comet-chat-user-contact-list.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [CometChatUserContactListComponent],
  imports: [CommonModule, AvatarModule],
  exports: [CometChatUserContactListComponent],
})
export class CometChatUserContactListModule {}
