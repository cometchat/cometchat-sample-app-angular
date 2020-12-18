import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

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

  roles = {};
  name: string;
  scope;
  unban;

  constructor() {}

  ngOnInit() {
    this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] = "Administrator";
    this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] = "Moderator";
    this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] = "Participant";
    this.scope = this.roles[this.member.scope];
  }
  unbanMember() {
    //console.log("unban clciked");

    this.actionGenerated.emit({
      type: "unban",
      payLoad: { member: this.member },
    });
  }
}
