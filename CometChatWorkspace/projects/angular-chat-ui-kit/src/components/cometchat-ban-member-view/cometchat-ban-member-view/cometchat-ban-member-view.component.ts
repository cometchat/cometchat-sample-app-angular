import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { BAN_ICON } from "../../resources/icons/banIcon";
import * as enums from "../../utils/enums";

@Component({
  selector: "cometchat-ban-member-view",
  templateUrl: "./cometchat-ban-member-view.component.html",
  styleUrls: ["./cometchat-ban-member-view.component.css"],
})
export class CometchatBanMemberViewComponent implements OnInit {
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
