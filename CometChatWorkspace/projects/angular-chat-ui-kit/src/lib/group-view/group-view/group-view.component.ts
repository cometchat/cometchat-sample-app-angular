import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "group-view",
  templateUrl: "./group-view.component.html",
  styleUrls: ["./group-view.component.css"],
})
export class GroupViewComponent implements OnInit {
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
