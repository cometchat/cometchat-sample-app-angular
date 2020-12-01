import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolTipComponent } from "./tool-tip/tool-tip.component";

@NgModule({
  declarations: [ToolTipComponent],
  imports: [CommonModule],
  exports: [ToolTipComponent],
})
export class ToolTipModule {}
