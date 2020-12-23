import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";
import { EDIT_SCOPE_ICON } from "../../resources/icons/editScopeIcon";
import { BAN_ICON } from "../../resources/icons/banIcon";
import { KICK_ICON } from "../../resources/icons/kickIcon";
import { RIGHT_TICK_ICON } from "../../resources/icons/rightTickIcon";
import { CLOSE_ICON } from "../../resources/icons/closeIcon";
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
  mem;
  hasGreaterRole: boolean = false;
  loggedInUser = null;
  PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;

  editScopeIcon = EDIT_SCOPE_ICON;
  banIcon = BAN_ICON;
  kickIcon = KICK_ICON;
  rightTick = RIGHT_TICK_ICON;
  closeIcon = CLOSE_ICON;

  constructor() {}

  ngOnInit() {
    this.getLoggedInUserInfo();

    // console.log("member view --> member details ", this.member);
    this.scope = this.member.scope;

    this.setRoles();

    if (
      this.checkRoleAuthorityLevel(this.item) >
      this.checkRoleAuthorityLevel(this.member)
    ) {
      this.hasGreaterRole = true;
    }
  }

  getLoggedInUserInfo() {
    CometChat.getLoggedinUser()
      .then((user) => {
        this.loggedInUser = user;
      })
      .catch((error) => {
        console.error(
          "Member view --> couldn't get logged in user information",
          error
        );
      });
  }

  /**
   * returns the level of authority on current item on the group
   * @param
   */
  checkRoleAuthorityLevel(item) {
    if (item.scope == CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
      return 3;
    }

    if (item.scope == CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
      return 2;
    }

    if (item.scope == CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
      return 1;
    }

    return 4;
  }

  /**
   * Sets the values for the roles dropdown
   * @param
   */
  setRoles() {
    this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] = enums.ADMINISTRATOR;
    this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] = enums.MODERATOR;
    this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] = enums.PARTICIPANT;

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
      type: enums.CHANGE_SCOPE,
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
      type: enums.BAN,
      payLoad: { member: this.member, scope: this.scope },
    });
  };

  /**
   * emits an event to kick the current member out of the group
   * @param
   */
  kickMember = () => {
    this.actionGenerated.emit({
      type: enums.KICK,
      payLoad: { member: this.member, scope: this.scope },
    });
  };
}
