import { OnDestroy, OnInit, OnChanges, EventEmitter, ChangeDetectorRef, SimpleChanges } from "@angular/core";
export declare class CometchatUserListComponent implements OnInit, OnDestroy, OnChanges {
    private ref;
    friendsOnly: boolean;
    hasActions: boolean;
    item: any;
    onUserClick: EventEmitter<any>;
    actionGenerated: EventEmitter<any>;
    userListenerId: string;
    decoratorMsg: string;
    userSearches: boolean;
    loader: Boolean;
    contactsNotFound: Boolean;
    contacts: any[];
    usersList: any[];
    usersRequest: any;
    timeout: any;
    defaultAvatarImage: string;
    USERS: String;
    SEARCH: String;
    constructor(ref: ChangeDetectorRef);
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Search User Based on their Name
     * @param String searchKey
     */
    searchUsers(searchKey: any): void;
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param Event e
     */
    handleScroll(e: any): void;
    /**
     * Get List of users that are contacts of the current user
     *
     */
    fetchNextContactList(): void;
    /**
     * This function updates the status ( online / offline ) , in real-time when getting signals from the listerners
     * @param Any user
     */
    userUpdated: (user: any) => void;
    /**
     * Emitting the user clicked so that it can be used in the parent component
     * @param Any userToEmit
     */
    onUserClicked(userToEmit: any): void;
    /**
     * Emitting the close Menu action to be used in parent component to handle screen logic
     * @param
     */
    handleMenuClose: () => boolean;
}
