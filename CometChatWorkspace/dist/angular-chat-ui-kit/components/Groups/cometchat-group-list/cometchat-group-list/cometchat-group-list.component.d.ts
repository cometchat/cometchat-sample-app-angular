import { ChangeDetectorRef, OnInit, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
export declare class CometchatGroupListComponent implements OnInit, OnDestroy, OnChanges {
    private ref;
    enableSelectedGroupStyling: boolean;
    groupToUpdate: any;
    groupToLeave: any;
    groupToDelete: any;
    timeout: any;
    loggedInUser: any;
    decoratorMessage: string;
    searchKey: string;
    selectedGroup: any;
    grouplist: any[];
    groupRequest: any;
    groupListenerId: string;
    openCreateGroupView: boolean;
    GROUPS: String;
    SEARCH: String;
    onGroupClick: EventEmitter<any>;
    constructor(ref: ChangeDetectorRef);
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Listener for group activities happening in real time
     * @param function callback
     */
    attachListeners(callback: any): void;
    /**
     * Builds a request for fetching a list of group matching the serach key
     * @param String searchKey
     */
    groupListRequestBuilder(searchKey?: string): any;
    /**
     * If a group Doesnt have an icon , it will generate one for it , using first Letter of the Group Name
     * @param Any group
     */
    setAvatar(group: any): any;
    getGroups: () => void;
    /**
     * Fetches list of groups according to the group request config
     * @param Event action
     */
    fetchNextGroups(): any;
    /**
     * Fetches list of groups according to the group request config
     * @param Event action
     */
    createGroupActionHandler: (group: any) => void;
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param Any group
     */
    groupClicked(group: any): void;
    /**
     * Helps the current user to join a password protected group , if the password entered by the user is correct
     * @param Event event
     */
    joinGroup(guid: any, groupType: any, password: string): void;
    /**
     * Searches for a list of groups matching the search key
     * @param Event event
     */
    searchGroup(event: any): void;
    groupUpdated: (key: any, message: any, group: any, options: any) => void;
    updateMemberRemoved: (group: any, options: any) => void;
    updateMemberAdded: (group: any, options: any) => void;
    updateMemberJoined: (group: any, options: any) => void;
    updateMemberChanged: (group: any, options: any) => void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Handles scroll action on GroupList and fetches more groups if user scrolls to bottom of group list
     * @param Event action
     */
    handleScroll(e: any): void;
    /**
     * toggles between opening and closing of groupCreationView / group creation form
     * @param
     */
    toggleCreateGroupView(): void;
}
