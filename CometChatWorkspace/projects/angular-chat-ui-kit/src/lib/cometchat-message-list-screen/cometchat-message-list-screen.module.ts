import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageListScreenComponent } from "./cometchat-message-list-screen/cometchat-message-list-screen.component";
import { MessageHeaderModule } from "../message-header/message-header.module";
import { MessageListModule } from "../message-list/message-list.module";

@NgModule({
  declarations: [CometchatMessageListScreenComponent],
  imports: [CommonModule, MessageHeaderModule, MessageListModule],
  exports: [CometchatMessageListScreenComponent],
})
export class CometchatMessageListScreenModule {}
