import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessageComposerComponent } from "./comet-chat-message-composer/comet-chat-message-composer.component";
import { ReplyPreviewModule } from "../reply-preview/reply-preview.module";
import { CreatePollViewModule } from "../create-poll-view/create-poll-view.module";

@NgModule({
  declarations: [CometChatMessageComposerComponent],
  imports: [CommonModule, ReplyPreviewModule, CreatePollViewModule],
  exports: [CometChatMessageComposerComponent],
})
export class CometChatMessageComposerModule {}
