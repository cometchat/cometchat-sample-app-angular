import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatViewGroupMemberListItemComponent implements OnInit {
    item: any;
    type: any;
    member: any;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    scope: any;
    showChangeScope: boolean;
    roles: {};
    roleCodes: any[];
    hasGreaterRole: boolean;
    PARTICIPANT: string;
    YOU: String;
    editScopeIcon: string;
    banIcon: string;
    kickIcon: string;
    rightTick: string;
    closeIcon: string;
    constructor();
    ngOnInit(): void;
    /**
     * returns the level of authority on current item on the group
     * @param
     */
    checkRoleAuthorityLevel(item: any): 1 | 2 | 3 | 4;
    /**
     * Sets the values for the roles dropdown
     * @param
     */
    setRoles(): void;
    /**
     * Closes or opens  the edit scope dropdown field
     * @param
     */
    toggleChangeScope(show: any): void;
    /**
     * Closes or opens  the edit scope dropdown field
     * @param Event event
     */
    scopeChangeHandler(event: any): void;
    /**
     * emits an event to update the scope of the current member
     * @param
     */
    updateMemberScope: () => void;
    /**
     * emits an event to ban  the current member
     * @param
     */
    banMember: () => void;
    /**
     * emits an event to kick the current member out of the group
     * @param
     */
    kickMember: () => void;
}
