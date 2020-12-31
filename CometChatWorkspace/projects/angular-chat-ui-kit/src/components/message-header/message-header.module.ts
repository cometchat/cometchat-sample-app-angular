import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageHeaderComponent } from "./message-header/message-header.component";
import { CometchatAvatarModule } from "../cometchat-avatar/cometchat-avatar.module";

@NgModule({
  declarations: [MessageHeaderComponent],
  imports: [CommonModule, CometchatAvatarModule],
  exports: [MessageHeaderComponent],
})
export class MessageHeaderModule {}
