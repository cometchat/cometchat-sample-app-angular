import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatNavBarComponent implements OnInit {
    item: any;
    type: any;
    lastMessage: any;
    enableSelectedGroupStyling: boolean;
    groupToUpdate: any;
    groupToLeave: any;
    groupToDelete: any;
    actionGenerated: EventEmitter<any>;
    onUserClick: EventEmitter<any>;
    displayConversationList: boolean;
    displayGroupList: boolean;
    displayUserList: boolean;
    displayUserInfoScreen: boolean;
    groupMessage: any[];
    curentItem: any;
    constructor();
    ngOnInit(): void;
    /**
     * Toggles the List to be opened on user clicked
     * @param
     */
    checkScreen(type: any): void;
    /**
     * Opens ConversationList
     */
    openConversationList(): void;
    /**
     * Opens GroupList
     */
    openGroupList(): void;
    /**
     * Opens userlist
     */
    openUserList(): void;
    /**
     * Opens User Info Screnn
     */
    openUserInfoScreen(): void;
    /**
     * Closes Detail View when tab is changed
     */
    closeDetailView(): void;
    /**
     * Listen to the user emitted by the userList component
     * @param Event user
     */
    userClicked(user: any): void;
    /**
     * Listen to the group emitted by the groupList component
     * @param Event user
     */
    groupClicked(group: any): void;
}
