import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatBanGroupMemberListItemComponent implements OnInit {
    item: any;
    bannedmemberlist: any[];
    actionGenerated: EventEmitter<any>;
    decoratorMessage: string;
    displayDecoratorMessage: boolean;
    membersToBan: any[];
    membersToUnban: any[];
    BANNED_MEMBERS: String;
    NAME: String;
    SCOPE: String;
    UNBAN: String;
    constructor();
    ngOnInit(): void;
    /**
     * Get the detail of member to be unbanned
     * @param
     */
    unbanMember(memberToUnBan: any): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * If User scrolls to the bottom of the current Contact list than fetch next items of the contact list and append
     * @param Event e
     */
    handleScroll(e: any): void;
    /**
     * Emits action to Close Ban member Window
     */
    closeBanMemberModal(): void;
}
