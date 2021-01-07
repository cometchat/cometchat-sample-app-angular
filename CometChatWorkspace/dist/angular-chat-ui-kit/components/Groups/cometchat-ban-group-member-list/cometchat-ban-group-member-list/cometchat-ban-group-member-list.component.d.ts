import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatBanGroupMemberListComponent implements OnInit {
    item: any;
    member: any;
    loggedInUser: any;
    actionGenerated: EventEmitter<any>;
    name: string;
    unban: any;
    banIcon: string;
    constructor();
    ngOnInit(): void;
    unbanMember(): void;
}
