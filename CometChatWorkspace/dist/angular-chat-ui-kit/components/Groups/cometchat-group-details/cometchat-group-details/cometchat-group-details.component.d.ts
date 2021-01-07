import { OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
export declare class CometchatGroupDetailsComponent implements OnInit, OnDestroy {
    item: any;
    type: any;
    actionGenerated: EventEmitter<any>;
    guid: any;
    groupMemberRequest: any;
    bannedGroupMemberRequest: any;
    userListenerId: string;
    groupListenerId: string;
    memberlist: any[];
    bannedmemberlist: any[];
    administratorslist: any[];
    moderatorslist: any[];
    loggedInUser: any;
    openViewMember: boolean;
    openBanMember: boolean;
    openAddMemberView: boolean;
    currentMemberScope: string;
    ADD_MEMBERS: String;
    DELETE_AND_EXIT: String;
    LEAVE_GROUP: String;
    BANNED_MEMBERS: String;
    OPTIONS: String;
    VIEW_MEMBERS: String;
    DETAILS: String;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Listener for activities happening in group in real time
     * @param
     */
    addEventListeners(callback: any): void;
    /**
     * Removes all the real time group listeners attached to the group that is opened
     * @param
     */
    removeListeners(): void;
    /**
     * Creates a Group MemberList request object
     * @param
     */
    createGroupMemberRequest(guid: any): CometChat.GroupMembersRequest;
    /**
     * Fetches list of group member accroding to the group member request object
     * @param
     */
    getGroupMembers(): void;
    /**
     * Creates a Banned MemberList request object
     * @param
     */
    createBannedMemberRequest(guid: any): CometChat.BannedMembersRequest;
    /**
     * Fetches list of Banned members accroding to the  banned members request object
     * @param
     */
    getBannedGroupMembers: () => boolean;
    groupUpdated: (key?: any, message?: any, group?: any, options?: any) => boolean;
    /**
     * Adds the members that are banned to bannedMemberList
     * @param any members
     */
    banMembers: (members: any) => void;
    /**
     * Updates group member data and information based on group actions
     * @param any member
     */
    groupMemberUpdated: (member: any) => void;
    /**
     * fetches next list of group members as the user scrolls to the bottom
     * @param
     */
    fetchNextGroupMembers(): any;
    /**
     * fetches next list of Banned members as the user scrolls to the bottom
     * @param
     */
    fetchNextBannedGroupMembers(): any;
    /**
     * Add Particpants to the current group
     * @param
     */
    addParticipants: (members: any, triggerUpdate?: boolean) => void;
    /**
     * Updates Group Participant's data according to the group activities
     * @param
     */
    updateParticipants: (updatedMember: any) => void;
    /**
     * Removes the participant from the group member list , when the member is banned
     * @param Any member
     */
    removeParticipants: (member: any, triggerUpdate?: boolean) => void;
    /**
     * Removes the participant from the banned member list , when the member is unbanned
     * @param
     */
    unbanMembers(members: any): void;
    leaveGroup: () => void;
    /**
     * helps the user (that is admin of the group) to delete the group
     * @param
     */
    deleteGroup: () => void;
    /**
     * Returns the role/scope that the current user has , for the group that is currently opened
     * @param Any member
     */
    checkMemberScope: (group: any) => "admin" | "moderator" | "participant";
    toggleViewMember(): void;
    toggleBanMember(): void;
    toggleAddMemberView(show: any): void;
    /**
     * Close thread when opened in small screen
     */
    closeThreadView(): void;
}
