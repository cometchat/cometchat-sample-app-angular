import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallMessageComponent } from "./call-message/call-message.component";

@NgModule({
  declarations: [CallMessageComponent],
  imports: [CommonModule],
  exports: [CallMessageComponent],
})
export class CallMessageModule {}
