import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUserContactListComponent } from "./comet-chat-user-contact-list/comet-chat-user-contact-list.component";

@NgModule({
  declarations: [CometChatUserContactListComponent],
  imports: [CommonModule],
  exports: [CometChatUserContactListComponent],
})
export class CometChatUserContactListModule {}
