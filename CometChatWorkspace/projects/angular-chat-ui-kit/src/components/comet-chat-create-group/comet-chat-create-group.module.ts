import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatCreateGroupComponent } from "./comet-chat-create-group/comet-chat-create-group.component";
import { BackdropModule } from "../backdrop/backdrop.module";

@NgModule({
  declarations: [CometChatCreateGroupComponent],
  imports: [CommonModule, BackdropModule],
  exports: [CometChatCreateGroupComponent],
})
export class CometChatCreateGroupModule {}
