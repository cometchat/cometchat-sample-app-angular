import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "comet-chat-ban-members",
  templateUrl: "./comet-chat-ban-members.component.html",
  styleUrls: ["./comet-chat-ban-members.component.css"],
})
export class CometChatBanMembersComponent implements OnInit {
  @Input() item = null;
  @Input() bannedmemberlist = [];
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  decoratorMessage = "Loading...";
  displayDecoratorMessage: boolean = true;
  membersToBan = [];
  membersToUnban = [];

  constructor() {}

  ngOnInit() {
    // console.log("BannedmemberList", this.bannedmemberlist);
    if (this.bannedmemberlist.length === 0) {
      this.decoratorMessage = "No banned members found";
    } else if (this.bannedmemberlist.length > 0) {
      this.displayDecoratorMessage = false;
    }
  }

  /**
   * Get the detail of member to be unbanned
   * @param
   */
  unbanMember(memberToUnBan) {
    // const group = this.context;
    console.log("member to unban ", memberToUnBan);

    const guid = this.item.guid;
    CometChat.unbanGroupMember(guid, memberToUnBan.uid)
      .then((response) => {
        if (response) {
          console.log("Group member unbanning success with response", response);
          this.actionGenerated.emit({
            type: enums.UNBAN_GROUP_MEMBERS,
            payLoad: [memberToUnBan],
          });
        }
      })
      .catch((error) => {
        console.log("Group member banning failed with error", error);
      });
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let data = action.payLoad;

    switch (action.type) {
      case enums.UNBAN:
        this.unbanMember(data.member);
        break;
      default:
        break;
    }
  }
  /**
   * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
   * @param Event e
   */
  handleScroll(e) {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      this.actionGenerated.emit({
        type: enums.FETCH_BANNED_MEMBERS,
      });
    }
  }

  /**
   * Emits action to Close Ban member Window
   */
  closeBanMemberModal() {
    //console.log("cometchat ban member --> close ban member clicked");

    this.actionGenerated.emit({ type: enums.BAN_MEMBER, payLoad: [] });
  }
}
