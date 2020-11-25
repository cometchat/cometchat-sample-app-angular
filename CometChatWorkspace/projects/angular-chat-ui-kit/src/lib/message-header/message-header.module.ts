import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageHeaderComponent } from "./message-header/message-header.component";
import { AvatarModule } from "../avatar/avatar.module";

@NgModule({
  declarations: [MessageHeaderComponent],
  imports: [CommonModule, AvatarModule],
  exports: [MessageHeaderComponent],
})
export class MessageHeaderModule {}
