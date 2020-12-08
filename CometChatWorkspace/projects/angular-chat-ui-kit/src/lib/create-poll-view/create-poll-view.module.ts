import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreatePollViewComponent } from "./create-poll-view/create-poll-view.component";
import { BackdropModule } from "../backdrop/backdrop.module";

@NgModule({
  declarations: [CreatePollViewComponent],
  imports: [CommonModule, BackdropModule],
  exports: [CreatePollViewComponent],
})
export class CreatePollViewModule {}
