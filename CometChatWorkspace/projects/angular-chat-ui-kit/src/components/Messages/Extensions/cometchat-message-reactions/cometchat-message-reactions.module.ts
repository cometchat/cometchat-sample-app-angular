import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatMessageReactionsComponent } from "./cometchat-message-reactions/cometchat-message-reactions.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";

@NgModule({
  declarations: [CometchatMessageReactionsComponent],
  imports: [CommonModule, PickerModule, EmojiModule],
  exports: [CometchatMessageReactionsComponent],
})
export class CometchatMessageReactionsModule {}
