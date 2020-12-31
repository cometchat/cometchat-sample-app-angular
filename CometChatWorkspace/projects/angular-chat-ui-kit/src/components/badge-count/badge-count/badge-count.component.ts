import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "badge-count",
  templateUrl: "./badge-count.component.html",
  styleUrls: ["./badge-count.component.css"],
})
export class BadgeCountComponent implements OnInit {
  @Input() count = null;

  constructor() {}

  ngOnInit() {}
}
