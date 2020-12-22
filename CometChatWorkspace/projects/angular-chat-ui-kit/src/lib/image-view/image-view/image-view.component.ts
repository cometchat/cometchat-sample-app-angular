import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import * as enums from "../../utils/enums";

@Component({
  selector: "image-view",
  templateUrl: "./image-view.component.html",
  styleUrls: ["./image-view.component.css"],
})
export class ImageViewComponent implements OnInit {
  @Input() MessageDetails;
  @Input() open;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  imageUrl: string;
  constructor() {}

  ngOnInit() {
    this.getUrl();
  }
  getUrl() {
    // console.log("dei", this.MessageDetails);

    let img = new Image();
    img.src = this.MessageDetails.data.url;
    this.imageUrl = img.src;
  }

  close() {
    this.actionGenerated.emit({
      type: enums.CLOSE_FULL_SCREEN_IMAGE,
    });
  }
}
