import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
@Component({
  selector: "member-view",
  templateUrl: "./member-view.component.html",
  styleUrls: ["./member-view.component.css"],
})
export class MemberViewComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() member = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  scope;
  showChangeScope: boolean = false;
  roles = {};
  roleCodes = [];
  PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;

  constructor() {}

  ngOnInit() {
    // console.log("member view --> member details ", this.member);
    this.scope = this.member.scope;

    this.setRoles();
  }

  /**
   * Sets the values for the roles dropdown
   * @param
   */
  setRoles() {
    this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] = "Administrator";
    this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] = "Moderator";
    this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] = "Participant";

    this.roleCodes = [
      CometChat.GROUP_MEMBER_SCOPE.ADMIN,
      CometChat.GROUP_MEMBER_SCOPE.MODERATOR,
      CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
    ];

    //console.log("member view --> roles ", this.roles);
  }

  /**
   * Closes or opens  the edit scope dropdown field
   * @param
   */
  toggleChangeScope(show) {
    this.showChangeScope = show;
  }

  /**
   * Closes or opens  the edit scope dropdown field
   * @param Event event
   */
  scopeChangeHandler(event) {
    //console.log("member view --> scope changed", event.target.value);
    this.scope = event.target.value;
  }

  /**
   * emits an event to update the scope of the current member
   * @param
   */
  updateMemberScope = () => {
    this.actionGenerated.emit({
      type: "changescope",
      payLoad: { member: this.member, scope: this.scope },
    });
    this.toggleChangeScope(false);
  };

  /**
   * emits an event to ban  the current member
   * @param
   */
  banMember = () => {
    this.actionGenerated.emit({
      type: "ban",
      payLoad: { member: this.member, scope: this.scope },
    });
  };

  /**
   * emits an event to kick the current member out of the group
   * @param
   */
  kickMember = () => {
    this.actionGenerated.emit({
      type: "kick",
      payLoad: { member: this.member, scope: this.scope },
    });
  };
}
