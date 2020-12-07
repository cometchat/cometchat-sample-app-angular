import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessageComposerComponent } from "./comet-chat-message-composer/comet-chat-message-composer.component";
import { ReplyPreviewModule } from "../reply-preview/reply-preview.module";

@NgModule({
  declarations: [CometChatMessageComposerComponent],
  imports: [CommonModule, ReplyPreviewModule],
  exports: [CometChatMessageComposerComponent],
})
export class CometChatMessageComposerModule {}
