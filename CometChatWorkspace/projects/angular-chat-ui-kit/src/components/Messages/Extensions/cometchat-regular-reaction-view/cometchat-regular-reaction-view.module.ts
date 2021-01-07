import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometchatRegularReactionViewComponent } from "./cometchat-regular-reaction-view/cometchat-regular-reaction-view.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";

@NgModule({
  declarations: [CometchatRegularReactionViewComponent],
  imports: [CommonModule, PickerModule, EmojiModule],
  exports: [CometchatRegularReactionViewComponent],
})
export class CometchatRegularReactionViewModule {}
