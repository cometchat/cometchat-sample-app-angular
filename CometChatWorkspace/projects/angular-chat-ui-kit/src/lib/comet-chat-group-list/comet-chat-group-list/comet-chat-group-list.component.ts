import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import * as enums from "../../utils/enums";

@Component({
  selector: "comet-chat-group-list",
  templateUrl: "./comet-chat-group-list.component.html",
  styleUrls: ["./comet-chat-group-list.component.css"],
})
export class CometChatGroupListComponent implements OnInit, OnDestroy {
  @Input() enableSelectedGroupStyling = false;

  timeout;
  loggedInUser = null;
  decoratorMessage = "";
  searchKey = "";
  selectedGroup = null;
  grouplist = [];
  groupRequest = null;
  groupListenerId = "grouplist_" + new Date().getTime();

  openCreateGroupView: boolean = false;

  @Output() onGroupClick: EventEmitter<any> = new EventEmitter();

  constructor(private ref: ChangeDetectorRef) {
    setInterval(() => {
      //console.log("UserList --> detectchange called");
      if (!this.ref["destroyed"]) {
        this.ref.detectChanges();
      }
    }, 5000);
  }

  ngOnInit() {
    this.groupRequest = this.groupListRequestBuilder(this.searchKey);
    this.getGroups();
    this.attachListeners(this.groupUpdated);
  }

  ngOnDestroy() {
    //Removing Group Listeners
    CometChat.removeGroupListener(this.groupListenerId);
  }

  /**
   * Listener for group activities happening in real time
   * @param function callback
   */

  attachListeners(callback) {
    CometChat.addGroupListener(
      this.groupListenerId,
      new CometChat.GroupListener({
        onGroupMemberScopeChanged: (
          message,
          changedUser,
          newScope,
          oldScope,
          changedGroup
        ) => {
          callback(enums.GROUP_MEMBER_SCOPE_CHANGED, message, changedGroup, {
            user: changedUser,
            scope: newScope,
          });
        },
        onGroupMemberKicked: (message, kickedUser, kickedBy, kickedFrom) => {
          callback(enums.GROUP_MEMBER_KICKED, message, kickedFrom, {
            user: kickedUser,
            hasJoined: false,
          });
        },
        onGroupMemberBanned: (message, bannedUser, bannedBy, bannedFrom) => {
          callback(enums.GROUP_MEMBER_BANNED, message, bannedFrom, {
            user: bannedUser,
            hasJoined: false,
          });
        },
        onGroupMemberUnbanned: (
          message,
          unbannedUser,
          unbannedBy,
          unbannedFrom
        ) => {
          callback(enums.GROUP_MEMBER_UNBANNED, message, unbannedFrom, {
            user: unbannedUser,
            hasJoined: false,
          });
        },
        onMemberAddedToGroup: (
          message,
          userAdded,
          userAddedBy,
          userAddedIn
        ) => {
          callback(enums.GROUP_MEMBER_ADDED, message, userAddedIn, {
            user: userAdded,
            hasJoined: true,
          });
        },
        onGroupMemberLeft: (message, leavingUser, group) => {
          callback(enums.GROUP_MEMBER_LEFT, message, group, {
            user: leavingUser,
          });
        },
        onGroupMemberJoined: (message, joinedUser, joinedGroup) => {
          callback(enums.GROUP_MEMBER_JOINED, message, joinedGroup, {
            user: joinedUser,
          });
        },
      })
    );
  }

  /**
   * Builds a request for fetching a list of group matching the serach key
   * @param String searchKey
   */
  groupListRequestBuilder(searchKey = "") {
    let groupRequest = null;

    if (searchKey !== "") {
      console.log(`Group List --> setting search key ${searchKey} `);

      groupRequest = new CometChat.GroupsRequestBuilder()
        .setLimit(30)
        .setSearchKeyword(searchKey)
        .build();
    } else {
      groupRequest = new CometChat.GroupsRequestBuilder().setLimit(30).build();
    }
    return groupRequest;
  }

  /**
   * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
   * @param Any group
   */
  setAvatar(group) {
    if (group.hasOwnProperty("icon") === false) {
      const guid = group.guid;
      const char = group.name.charAt(0).toUpperCase();
      // group.icon = SvgAvatar.getAvatar(guid, char);
    }
    return group;
  }

  getGroups = () => {
    this.decoratorMessage = "Loading...";

    CometChat.getLoggedinUser()
      .then((user) => {
        this.loggedInUser = user;
        this.fetchNextGroups()
          .then((groupList) => {
            if (groupList.length === 0) {
              this.decoratorMessage = "No groups found";
            }

            console.log(
              "group list fetched now --> group list fetched ",
              groupList
            );

            groupList.forEach((group) => (group = this.setAvatar(group)));
            // this.setState({ grouplist: [...this.state.grouplist, ...groupList] });
            this.grouplist = [...this.grouplist, ...groupList];

            console.log("group list --> group list fetched ", this.grouplist);
            this.decoratorMessage = "";

            if (this.grouplist.length === 0) {
              this.decoratorMessage = "No groups found";
            }
          })
          .catch((error) => {
            this.decoratorMessage = "Error";
            console.error(
              "[CometChatGroupList] getGroups fetchNextGroups error",
              error
            );
          });
      })
      .catch((error) => {
        this.decoratorMessage = "Error";
        console.log(
          "[CometChatGroupList] getUsers getLoggedInUser error",
          error
        );
      });
  };

  /**
   * Fetches list of groups according to the group request config
   * @param Event action
   */
  fetchNextGroups() {
    return this.groupRequest.fetchNext();
  }

  /**
   * Fetches list of groups according to the group request config
   * @param Event action
   */
  createGroupActionHandler = (group) => {
    this.setAvatar(group);
    const groupList = [group, ...this.grouplist];

    // this.handleClick(group);
    // this.setState({ grouplist: groupList, createGroup: false });
    this.grouplist = [group, ...this.grouplist];
  };

  /**
   * Emitting the Group clicked so that it can be used in the parent component
   * @param Any group
   */
  groupClicked(group) {
    console.log("group List --> group clicked is ", group);
    this.onGroupClick.emit(group);

    if (this.enableSelectedGroupStyling) {
      this.selectedGroup = group;
    }
  }

  /**
   * Searches for a list of groups matching the search key
   * @param Event event
   */
  searchGroup(event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let val = event.target.value;
    this.timeout = setTimeout(() => {
      this.groupRequest = this.groupListRequestBuilder(val);

      console.log("group List --> message request ", this.groupRequest);

      this.grouplist = [];
      this.getGroups();
    }, 1000);
  }

  groupUpdated = (key, message, group, options) => {
    switch (key) {
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
        // this.updateMemberChanged(group, options);
        console.log(
          " comet chat group list -->  ",
          enums.GROUP_MEMBER_SCOPE_CHANGED
        );
        break;
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        // this.updateMemberRemoved(group, options);
        console.log(" comet chat group list -->  ", enums.GROUP_MEMBER_KICKED);
        console.log(" comet chat group list -->  ", enums.GROUP_MEMBER_BANNED);
        console.log(" comet chat group list -->  ", enums.GROUP_MEMBER_LEFT);
        break;
      case enums.GROUP_MEMBER_ADDED:
        // this.updateMemberAdded(group, options);
        console.log(" comet chat group list -->  ", enums.GROUP_MEMBER_ADDED);
        break;
      case enums.GROUP_MEMBER_JOINED:
        // this.updateMemberJoined(group, options);
        console.log(" comet chat group list -->  ", enums.GROUP_MEMBER_JOINED);
        break;
      default:
        break;
    }
  };

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action) {
    let data = action.payLoad;

    console.log("Comet Chat Group List --> action generation is ", action);

    switch (action.type) {
      case enums.CLOSE_CREATE_GROUP_VIEW: {
        this.toggleCreateGroupView();
        break;
      }
      case enums.GROUP_CREATED: {
        console.log(" GroupList --> group created", data);
        this.toggleCreateGroupView();
        this.createGroupActionHandler(data);
        break;
      }
    }
  }

  /**
   * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
   * @param Event action
   */
  handleScroll(e) {
    const bottom =
      Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
      Math.round(e.currentTarget.clientHeight);

    console.log("Group List --> reached bottom ", bottom);
    if (bottom) this.getGroups();
  }

  /**
   * toggles between opening and closing of groupCreationView / group creation form
   * @param
   */
  toggleCreateGroupView() {
    this.openCreateGroupView = !this.openCreateGroupView;
  }
}
