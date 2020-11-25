import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageListComponent } from "./message-list/message-list.component";

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule],
  exports: [MessageListComponent],
})
export class MessageListModule {}
