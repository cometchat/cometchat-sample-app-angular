import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";

@Component({
  selector: "comet-chat-ban-members",
  templateUrl: "./comet-chat-ban-members.component.html",
  styleUrls: ["./comet-chat-ban-members.component.css"],
})
export class CometChatBanMembersComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() bannedmemberlist = [];
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  decoratorMessage = "Loading...";
  membersToBan = [];
  membersToUnban = [];

  constructor() {}

  ngOnInit() {
    console.log("memberList", this.bannedmemberlist);
  }

  unbanMember(memberToUnBan) {
    // const group = this.context;
    console.log("member to unban ", memberToUnBan);

    const guid = this.item.guid;
    CometChat.unbanGroupMember(guid, memberToUnBan.uid)
      .then((response) => {
        if (response) {
          console.log("Group member unbanning success with response", response);
          this.actionGenerated.emit({
            type: "unbanGroupMembers",
            payLoad: [memberToUnBan],
          });
        }
      })
      .catch((error) => {
        console.log("Group member banning failed with error", error);
      });
  }

  actionHandler(action) {
    let data = action.payLoad;

    switch (action.type) {
      case "unban":
        this.unbanMember(data.member);
        break;
      default:
        break;
    }
  }
  handleScroll(e) {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      this.actionGenerated.emit({
        type: "fetchBannedMembers",
      });
    }
  }

  closeBanMemberModal() {
    console.log("cometchat ban member --> close ban member clicked");

    this.actionGenerated.emit({ type: "banmember", payLoad: null });
  }
}
