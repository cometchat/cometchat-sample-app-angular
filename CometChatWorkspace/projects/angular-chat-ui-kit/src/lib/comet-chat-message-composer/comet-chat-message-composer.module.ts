import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatMessageComposerComponent } from "./comet-chat-message-composer/comet-chat-message-composer.component";
import { ReplyPreviewModule } from "../reply-preview/reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { StickerViewModule } from "../sticker-view/sticker-view.module";
import { CreatePollViewModule } from "../create-poll-view/create-poll-view.module";
@NgModule({
  declarations: [CometChatMessageComposerComponent],
  imports: [
    CommonModule,
    ReplyPreviewModule,
    PickerModule,
    StickerViewModule,
    CreatePollViewModule,
  ],
  exports: [CometChatMessageComposerComponent],
})
export class CometChatMessageComposerModule {}
