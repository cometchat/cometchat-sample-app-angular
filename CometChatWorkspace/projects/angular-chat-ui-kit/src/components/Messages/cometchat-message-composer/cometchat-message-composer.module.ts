import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageComposerComponent } from "./cometchat-message-composer/cometchat-message-composer.component";
import { CometchatSmartReplyPreviewModule } from "../Extensions/cometchat-smart-reply-preview/cometchat-smart-reply-preview.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { CometchatStickerViewModule } from "../cometchat-sticker-view/cometchat-sticker-view.module";
import { CometchatCreatePollViewModule } from "../Extensions/cometchat-create-poll-view/cometchat-create-poll-view.module";
@NgModule({
  declarations: [CometchatMessageComposerComponent],
  imports: [
    CommonModule,
    CometchatSmartReplyPreviewModule,
    PickerModule,
    CometchatStickerViewModule,
    CometchatCreatePollViewModule,
  ],
  exports: [CometchatMessageComposerComponent],
})
export class CometchatMessageComposerModule {}
