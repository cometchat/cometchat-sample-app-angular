import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "cometchat-nav-bar",
  templateUrl: "./cometchat-nav-bar.component.html",
  styleUrls: ["./cometchat-nav-bar.component.css"],
})
export class CometchatNavBarComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() lastMessage;
  @Input() enableSelectedGroupStyling = false;
  @Input() groupToUpdate = null;
  @Input() groupToLeave = null;
  @Input() groupToDelete = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  @Output() onUserClick: EventEmitter<any> = new EventEmitter();

  displayConversationList: boolean = true;
  displayGroupList: boolean = false;
  displayUserList: boolean = false;
  displayUserInfoScreen: boolean = false;

  groupMessage = [];

  constructor() {}

  ngOnInit() {}

  /**
   * Toggles the List to be opened on user clicked
   * @param
   */
  checkScreen(type) {
    this.displayConversationList = type === "conversationList" ? true : false;
    this.displayGroupList = type === "groupList" ? true : false;
    this.displayUserList = type === "userList" ? true : false;
    this.displayUserInfoScreen = type === "infoScreen" ? true : false;
  }

  /**
   * Opens ConversationList
   */
  openConversationList() {
    this.checkScreen("conversationList");
    // this.actionGenerated.emit({
    //   type: "tabChanged",
    // });
  }

  /**
   * Opens GroupList
   */
  openGroupList() {
    this.checkScreen("groupList");
    // this.actionGenerated.emit({
    //   type: "tabChanged",
    // });
  }

  /**
   * Opens userlist
   */
  openUserList() {
    this.checkScreen("userList");
    // this.actionGenerated.emit({
    //   type: "tabChanged",
    // });
  }

  /**
   * Opens User Info Screnn
   */
  openUserInfoScreen() {
    this.checkScreen("infoScreen");
    // this.actionGenerated.emit({
    //   type: "tabChanged",
    // });
  }

  /**
   * Listen to the user emitted by the userList component
   * @param Event user
   */
  userClicked(user) {
    if (user.hasOwnProperty("conversationWith")) {
      this.item = user.conversationWith;
    } else {
      this.item = user;
    }
    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }
    this.lastMessage = user.lastMessage;
    this.onUserClick.emit(this.item);
  }

  /**
   * Listen to the group emitted by the groupList component
   * @param Event user
   */
  groupClicked(group) {
    this.item = group;
    console.log("navbar group ", group);

    //Close Thread And User Detail Screen When Chat Window Is Changed
    //this.closeThreadMessages();
    //this.viewDetailScreen = false;

    if (this.item.hasOwnProperty("uid")) {
      this.type = "user";
    } else {
      this.type = "group";
    }

    this.onUserClick.emit(this.item);
  }
}
