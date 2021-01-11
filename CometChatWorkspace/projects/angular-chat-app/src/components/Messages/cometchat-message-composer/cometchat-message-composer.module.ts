import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageComposerComponent } from "./cometchat-message-composer/cometchat-message-composer.component";
import { CometchatSmartReplyPreviewModule } from "../Extensions/cometchat-smart-reply-preview/cometchat-smart-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { CometchatStickerKeyboardModule } from "../cometchat-sticker-keyboard/cometchat-sticker-keyboard.module";
import { CometchatCreatePollModule } from "../Extensions/cometchat-create-poll/cometchat-create-poll.module";
@NgModule({
  declarations: [CometchatMessageComposerComponent],
  imports: [
    CommonModule,
    CometchatSmartReplyPreviewModule,
    PickerModule,
    CometchatStickerKeyboardModule,
    CometchatCreatePollModule,
  ],
  exports: [CometchatMessageComposerComponent],
})
export class CometchatMessageComposerModule {}
