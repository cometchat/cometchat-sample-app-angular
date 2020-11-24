import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatUserListScreenComponent } from "./cometchat-user-list-screen/cometchat-user-list-screen.component";
import { CometChatUserContactListModule } from "../comet-chat-user-contact-list/comet-chat-user-contact-list.module";

@NgModule({
  declarations: [CometchatUserListScreenComponent],
  imports: [CommonModule, CometChatUserContactListModule],
  exports: [CometchatUserListScreenComponent],
})
export class CometchatUserListScreenModule {}
