import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiveReactionComponent } from "./live-reaction/live-reaction.component";

@NgModule({
  declarations: [LiveReactionComponent],
  imports: [CommonModule],
  exports: [LiveReactionComponent],
})
export class LiveReactionModule {}
