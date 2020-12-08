import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePollViewComponent } from "./create-poll-view/create-poll-view.component";

@NgModule({
  declarations: [CreatePollViewComponent],
  imports: [CommonModule],
  exports: [CreatePollViewComponent],
})
export class CreatePollViewModule {}
