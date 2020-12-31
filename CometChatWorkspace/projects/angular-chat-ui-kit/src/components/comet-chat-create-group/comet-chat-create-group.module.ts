import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatCreateGroupComponent } from "./comet-chat-create-group/comet-chat-create-group.component";
import { CometchatBackdropModule } from "../cometchat-backdrop/cometchat-backdrop.module";

@NgModule({
  declarations: [CometChatCreateGroupComponent],
  imports: [CommonModule, CometchatBackdropModule],
  exports: [CometChatCreateGroupComponent],
})
export class CometChatCreateGroupModule {}
