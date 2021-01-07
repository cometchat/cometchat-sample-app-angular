import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageComposerComponent } from "./cometchat-message-composer/cometchat-message-composer.component";
import { CometchatSmartReplyPreviewModule } from "../Extensions/cometchat-smart-reply-preview/cometchat-smart-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { CometchatStickerKeyboardModule } from "../cometchat-sticker-keyboard/cometchat-sticker-keyboard.module";
import { CometchatCreatePollViewModule } from "../Extensions/cometchat-create-poll-view/cometchat-create-poll-view.module";
@NgModule({
  declarations: [CometchatMessageComposerComponent],
  imports: [
    CommonModule,
    CometchatSmartReplyPreviewModule,
    PickerModule,
    CometchatStickerKeyboardModule,
    CometchatCreatePollViewModule,
  ],
  exports: [CometchatMessageComposerComponent],
})
export class CometchatMessageComposerModule {}
