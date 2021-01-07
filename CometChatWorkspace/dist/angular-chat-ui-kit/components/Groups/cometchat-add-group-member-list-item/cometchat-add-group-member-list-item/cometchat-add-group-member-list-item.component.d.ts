import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatAddGroupMemberListItemComponent implements OnInit {
    item: any;
    type: any;
    user: any;
    members: any;
    checked: boolean;
    actionGenerated: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    /**
     * toggle the checkbox for each users , that is, to add them or not to add them in the group
     * @param Event event
     */
    handleCheck(event: any): void;
}
