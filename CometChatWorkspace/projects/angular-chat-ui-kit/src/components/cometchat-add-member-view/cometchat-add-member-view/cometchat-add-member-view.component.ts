import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import * as enums from "../../utils/enums";

@Component({
  selector: "cometchat-add-member-view",
  templateUrl: "./cometchat-add-member-view.component.html",
  styleUrls: ["./cometchat-add-member-view.component.css"],
})
export class CometchatAddMemberViewComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() user = null;
  @Input() members = null;

  checked: boolean = false;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.checked = this.members.find((member) => member.uid === this.user.uid);
  }

  /**
   * toggle the checkbox for each users , that is, to add them or not to add them in the group
   * @param Event event
   */
  handleCheck(event) {
    this.checked = !this.checked;

    this.actionGenerated.emit({
      type: enums.MEMBER_UPDATED,
      payLoad: { user: this.user, userState: this.checked },
    });

    // props.changed(props.user, value);
  }
}
