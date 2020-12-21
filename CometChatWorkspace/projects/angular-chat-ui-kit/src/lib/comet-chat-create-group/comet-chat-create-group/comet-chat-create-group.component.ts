import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "comet-chat-create-group",
  templateUrl: "./comet-chat-create-group.component.html",
  styleUrls: ["./comet-chat-create-group.component.css"],
})
export class CometChatCreateGroupComponent implements OnInit {
  error = null;
  passwordInput: boolean = false;
  name: String = "";
  type: String = "";
  password = "";

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * Changes the password according to the text entered by the user
   * @param Event event
   */
  passwordChangeHandler(event) {
    this.password = event.target.value;
    console.log(" create Group --> password ", event.target.value);
  }

  /**
   * Changes the Group Name according to the text entered by the user
   * @param Event event
   */
  nameChangeHandler(event) {
    this.name = event.target.value;
    console.log(" create Group --> name ", event.target.value);
  }

  /**
   * Changes the Type of  according to the option seletced by the user by the user
   * @param Event event
   */
  typeChangeHandler(event) {
    const type = event.target.value;
    this.type = event.target.value;

    console.log(" create Group --> type of group ", event.target.value);

    if (type === "protected") {
      this.passwordInput = true;
    } else {
      this.passwordInput = false;
    }
  }

  /**
   * Validates all the group details that were entered before creating the group
   * @param
   */
  validate = () => {
    const groupName = this.name.trim();
    const groupType = this.type.trim();

    if (!groupName) {
      this.error = enums.GROUP_NAME_BLANK_ERROR;
      return false;
    }

    if (!groupType) {
      this.error = enums.GROUP_TYPE_BLANK_ERROR;

      return false;
    }

    let password = "";
    if (groupType === "protected") {
      const password = this.password;

      if (!password.length) {
        this.error = enums.GROUP_PASSWORD_BLANK_ERROR;

        return false;
      }
    }
    return true;
  };

  /**
   * If the Group Data is successfully validated , below function creates the group
   * @param
   */
  createGroup() {
    if (!this.validate()) {
      return false;
    }

    const groupType = this.type.trim();

    const password = this.password;
    const guid = "group_" + new Date().getTime();
    const name = this.name.trim();
    let type = CometChat.GROUP_TYPE.PUBLIC;

    switch (groupType) {
      case enums.PUBLIC_GROUP:
        type = CometChat.GROUP_TYPE.PUBLIC;
        break;
      case enums.PRIVATE_GROUP:
        type = CometChat.GROUP_TYPE.PRIVATE;
        break;
      case enums.PROTECTED_GROUP:
        type = CometChat.GROUP_TYPE.PASSWORD;
        break;
      default:
        break;
    }

    const group = new CometChat.Group(guid, name, type, password);

    CometChat.createGroup(group)
      .then((group) => {
        console.log("Group created successfully:", group);
        this.resetGroupData();
        this.actionGenerated.emit({ type: "groupCreated", payLoad: group });
      })
      .catch((error) => {
        console.log("Group creation failed with exception:", error);
        this.error = error;
      });
  }

  /**
   * Emits an action indicating the parent to close the create group view
   * @param
   */
  closeCreateGroupView() {
    console.log(" create Group --> close group view ");
    this.actionGenerated.emit({ type: "closeCreateGroupView", payLoad: null });
  }

  /**
   * Resets all the Group creation form data to initial values
   * @param
   */
  resetGroupData() {
    this.error = null;
    this.passwordInput = false;
    this.name = "";
    this.type = "";
    this.password = "";
  }
}
