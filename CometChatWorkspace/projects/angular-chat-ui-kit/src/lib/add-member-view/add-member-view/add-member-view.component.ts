import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import * as enums from "../../utils/enums";

@Component({
  selector: "add-member-view",
  templateUrl: "./add-member-view.component.html",
  styleUrls: ["./add-member-view.component.css"],
})
export class AddMemberViewComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() user = null;
  @Input() members = null;

  checked: boolean = false;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log("add member view --> user ", this.user);

    this.checked = this.members.find((member) => member.uid === this.user.uid);
  }

  /**
   * toggle the checkbox for each users , that is, to add them or not to add them in the group
   * @param Event event
   */
  handleCheck(event) {
    this.checked = !this.checked;

    console.log(`user is checked`, this.checked);

    this.actionGenerated.emit({
      type: enums.MEMBER_UPDATED,
      payLoad: { user: this.user, userState: this.checked },
    });

    // props.changed(props.user, value);
  }
}
