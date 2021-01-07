import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatViewGroupMemberListComponent implements OnInit {
    item: any;
    type: any;
    loggedInUser: any;
    memberlist: any[];
    PARTICIPANT: string;
    NAME: String;
    SCOPE: String;
    GROUP_MEMBERS: String;
    BAN: String;
    KICK: String;
    actionGenerated: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    /**
     * Handles all the actions emitted by the child components that make the current component
     * @param Event action
     */
    actionHandler(action: any): void;
    /**
     * Changes the scope of a member of a group
     * @param Any member
     */
    changeScope: (member: any, scope: any) => void;
    /**
     * Bans a  member of a group
     * @param Any memberToBan
     */
    banMember: (memberToBan: any) => void;
    /**
     * kicks the member member of a group
     * @param Any memberToKick
     */
    kickMember: (memberToKick: any) => void;
    /**
     * Emits an action to indicate the parent component to close the view member modal
     * @param
     */
    closeViewMemberModal(): void;
}
