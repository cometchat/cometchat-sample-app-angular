import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessageComposerComponent } from "./comet-chat-message-composer/comet-chat-message-composer.component";
import { ReplyPreviewModule } from "../reply-preview/reply-preview.module";
import { NgxEmojiPickerModule } from "ngx-emoji-picker";
@NgModule({
  declarations: [CometChatMessageComposerComponent],
  imports: [CommonModule, ReplyPreviewModule, NgxEmojiPickerModule],
  exports: [CometChatMessageComposerComponent],
})
export class CometChatMessageComposerModule {}
