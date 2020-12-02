import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.css"],
})
export class BackdropComponent implements OnInit {
  @Input() show;
  constructor() {}

  ngOnInit() {}
}
