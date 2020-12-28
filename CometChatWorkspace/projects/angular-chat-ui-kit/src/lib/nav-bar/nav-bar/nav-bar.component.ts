import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  @Input() item = null;
  @Input() type = null;
  @Input() lastMessage;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();
  @Output() onUserClick: EventEmitter<any> = new EventEmitter();

  displayConversationList: boolean = true;
  displayGroupList: boolean = false;
  displayUserList: boolean = false;

  displayUserInfoScreen: boolean = false;

  constructor() {}

  ngOnInit() {}

  checkScreen(type) {
    this.displayConversationList = type === "conversationList" ? true : false;
    this.displayGroupList = type === "groupList" ? true : false;
    this.displayUserList = type === "userList" ? true : false;
    this.displayUserInfoScreen = type === "infoScreen" ? true : false;
  }

  /**
   *
   */
  openConversationList() {
    // this.displayConversationList = true;
    this.checkScreen("conversationList");
    this.actionGenerated.emit({
      type: "tabChanged",
    });
  }

  openGroupList() {
    this.checkScreen("groupList");

    // this.displayGroupList = true;
    this.actionGenerated.emit({
      type: "tabChanged",
    });
  }
  openUserList() {
    this.checkScreen("userList");

    // this.displayUserList = true;
    this.actionGenerated.emit({
      type: "tabChanged",
    });
  }
  openUserInfoScreen() {
    this.checkScreen("infoScreen");

    // this.displayUserInfoScreen = true;
    this.actionGenerated.emit({
      type: "tabChanged",
    });
  }

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

    // this.curentItem = this.item;
    console.log("navBar ", this.item);
    this.onUserClick.emit(this.item);
  }
}
