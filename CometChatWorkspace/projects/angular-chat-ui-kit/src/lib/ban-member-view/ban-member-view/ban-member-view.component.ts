import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { BAN_ICON } from "../../resources/icons/banIcon";
import * as enums from "../../utils/enums";

@Component({
  selector: "ban-member-view",
  templateUrl: "./ban-member-view.component.html",
  styleUrls: ["./ban-member-view.component.css"],
})
export class BanMemberViewComponent implements OnInit {
  @Input() item = null;
  @Input() member = null;
  @Input() loggedInUser = null;
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  name: string;
  unban;
  banIcon = BAN_ICON;

  constructor() {}

  ngOnInit() {}
  unbanMember() {
    //console.log("unban clciked");

    this.actionGenerated.emit({
      type: "unban",
      payLoad: { member: this.member },
    });
  }
}
