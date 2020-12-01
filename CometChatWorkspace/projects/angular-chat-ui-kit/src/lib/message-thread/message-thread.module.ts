import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageThreadComponent } from "./message-thread/message-thread.component";

@NgModule({
  declarations: [MessageThreadComponent],
  imports: [CommonModule],
  exports: [MessageThreadComponent],
})
export class MessageThreadModule {}
