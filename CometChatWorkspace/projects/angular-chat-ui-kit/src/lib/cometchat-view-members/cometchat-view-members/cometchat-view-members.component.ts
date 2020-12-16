import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
@Component({
  selector: "cometchat-view-members",
  templateUrl: "./cometchat-view-members.component.html",
  styleUrls: ["./cometchat-view-members.component.css"],
})
export class CometchatViewMembersComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() memberlist = [];

  PARTICIPANT = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let data = action.payLoad;

    console.log("cometchat view member --> action generation is ", action);

    switch (action.type) {
      case "changescope": {
        this.changeScope(data.member, data.scope);
        break;
      }
      case "ban": {
        this.banMember(data.member);
        break;
      }
      case "kick": {
        this.kickMember(data.member);
        break;
      }
    }
  }

  /**
   * Changes the scope of a member of a group
   * @param Any member
   */
  changeScope = (member, scope) => {
    const guid = this.item.guid;

    CometChat.updateGroupMemberScope(guid, member.uid, scope)
      .then((response) => {
        if (response) {
          console.log(
            "updateGroupMemberScope success with response: ",
            response
          );
          const updatedMember = Object.assign({}, member, { scope: scope });
          this.actionGenerated.emit({
            type: "updateGroupParticipants",
            payLoad: updatedMember,
          });
        }
      })
      .catch((error) => {
        console.log("updateGroupMemberScope failed with error: ", error);
      });
  };

  /**
   * Bans a  member of a group
   * @param Any memberToBan
   */
  banMember = (memberToBan) => {
    const guid = this.item.guid;
    CometChat.banGroupMember(guid, memberToBan.uid)
      .then((response) => {
        if (response) {
          console.log("banGroupMember success with response: ", response);
          this.actionGenerated.emit({
            type: "removeGroupParticipants",
            payLoad: memberToBan,
          });
        }
      })
      .catch((error) => {
        console.log("banGroupMember failed with error: ", error);
      });
  };

  /**
   * kicks the member member of a group
   * @param Any memberToKick
   */
  kickMember = (memberToKick) => {
    const guid = this.item.guid;
    CometChat.kickGroupMember(guid, memberToKick.uid)
      .then((response) => {
        if (response) {
          console.log("kickGroupMember success with response: ", response);
          this.actionGenerated.emit({
            type: "removeGroupParticipants",
            payLoad: memberToKick,
          });
        }
      })
      .catch((error) => {
        console.log("kickGroupMember failed with error: ", error);
      });
  };

  /**
   * Emits an action to indicate the parent component to close the view member modal
   * @param
   */
  closeViewMemberModal() {
    console.log("cometchat view member --> close view member clicked");
    this.actionGenerated.emit({ type: "openViewMember", payLoad: null });
  }
}
