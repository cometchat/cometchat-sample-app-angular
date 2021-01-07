import { OnDestroy, OnInit, EventEmitter } from "@angular/core";
export declare class CometchatAddGroupMemberListComponent implements OnInit, OnDestroy {
    item: any;
    type: any;
    memberlist: any[];
    bannedmemberlist: any[];
    friendsOnly: boolean;
    actionGenerated: EventEmitter<any>;
    decoratorMessage: string;
    userlist: any[];
    membersToAdd: any[];
    membersToRemove: any[];
    filteredlist: any[];
    timeout: any;
    addBtnText: String;
    membersRequest: any;
    userListenerId: string;
    USERS: String;
    SEARCH: String;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Attaches the user listeners
     * @param function callback
     */
    attachListeners(callback: any): void;
    /**
     * Removes all the attached listeners
     * @param
     */
    removeListeners(): void;
    /**
     * Updates user , based on user activity detected through listeners
     * @param Any user
     */
    userUpdated: (user: any) => void;
    /**
     * Builds a request for fetching a list of users matching the serach key
     * @param String searchKey
     */
    createMemberRequest(searchKey?: string): any;
    /**
     * Searches for a list of users matching the search key
     * @param Event e
     */
    searchUsers: (e: any) => void;
    /**
     * fetches a list of users based on the member request config
     * @param
     */
    getUsers: () => void;
    /**
     * Handles all the events emitted by child components
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Updates the memberToAdd list
     * @param Any user
     */
    membersUpdated: (user: any, userState: any) => void;
    /**
     * adds all the members of the memberToAdd list to the group
     * @param
     */
    updateMembers: () => void;
    /**
     * fetches a nexts set of list  of users based on the member request config
     * @param
     */
    fetchNextUsers(): any;
    /**
     * Handles scroll action on addMemberList and fetches more members that can be added to group ,  if user scrolls to bottom of memberList
     * @param Event action
     */
    handleScroll(e: any): void;
    closeAddMembersView(): void;
}
