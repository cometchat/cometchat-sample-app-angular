import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReadRecieptComponent } from "./read-reciept/read-reciept.component";

@NgModule({
  declarations: [ReadRecieptComponent],
  imports: [CommonModule],
  exports: [ReadRecieptComponent],
})
export class ReadRecieptModule {}
