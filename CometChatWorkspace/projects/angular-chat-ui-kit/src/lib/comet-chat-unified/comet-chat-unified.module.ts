import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatUnifiedComponent } from "./comet-chat-unified/comet-chat-unified.component";

@NgModule({
  declarations: [CometChatUnifiedComponent],
  imports: [CommonModule],
  exports: [CometChatUnifiedComponent],
})
export class CometChatUnifiedModule {}
