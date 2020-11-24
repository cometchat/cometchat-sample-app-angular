import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageHeaderComponent } from "./message-header/message-header.component";

@NgModule({
  declarations: [MessageHeaderComponent],
  imports: [CommonModule],
  exports: [MessageHeaderComponent],
})
export class MessageHeaderModule {}
