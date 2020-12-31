import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BadgeCountComponent } from "./badge-count/badge-count.component";

@NgModule({
  declarations: [BadgeCountComponent],
  imports: [CommonModule],
  exports: [BadgeCountComponent],
})
export class BadgeCountModule {}
