import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "cometchat-group-view",
  templateUrl: "./cometchat-group-view.component.html",
  styleUrls: ["./cometchat-group-view.component.css"],
})
export class CometchatGroupViewComponent implements OnInit {
  @Input() group = null;
  @Input() selectedGroup = null;

  @Output() onGroupClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Emitting the Group clicked so that it can be used in the parent component
   * @param Any group
   */
  groupClicked(group) {
    console.log("group view --> group clicked is ", group);
    this.onGroupClick.emit(group);
  }
}
