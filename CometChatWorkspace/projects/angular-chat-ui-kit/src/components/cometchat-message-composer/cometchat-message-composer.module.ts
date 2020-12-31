import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageComposerComponent } from "./cometchat-message-composer/cometchat-message-composer.component";
import { CometchatReplyPreviewModule } from "../cometchat-reply-preview/cometchat-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { StickerViewModule } from "../sticker-view/sticker-view.module";
import { CometchatCreatePollViewModule } from "../cometchat-create-poll-view/cometchat-create-poll-view.module";
@NgModule({
  declarations: [CometchatMessageComposerComponent],
  imports: [
    CommonModule,
    CometchatReplyPreviewModule,
    PickerModule,
    StickerViewModule,
    CometchatCreatePollViewModule,
  ],
  exports: [CometchatMessageComposerComponent],
})
export class CometchatMessageComposerModule {}
