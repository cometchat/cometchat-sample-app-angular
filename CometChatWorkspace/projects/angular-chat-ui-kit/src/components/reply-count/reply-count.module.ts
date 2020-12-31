import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReplyCountComponent } from "./reply-count/reply-count.component";

@NgModule({
  declarations: [ReplyCountComponent],
  imports: [CommonModule],
  exports: [ReplyCountComponent],
})
export class ReplyCountModule {}
