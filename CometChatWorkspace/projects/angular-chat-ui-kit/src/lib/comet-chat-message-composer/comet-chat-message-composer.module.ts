import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessageComposerComponent } from "./comet-chat-message-composer/comet-chat-message-composer.component";

@NgModule({
  declarations: [CometChatMessageComposerComponent],
  imports: [CommonModule],
  exports: [CometChatMessageComposerComponent],
})
export class CometChatMessageComposerModule {}
