import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatGroupListItemComponent implements OnInit {
    group: any;
    selectedGroup: any;
    onGroupClick: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    /**
     * Emitting the Group clicked so that it can be used in the parent component
     * @param Any group
     */
    groupClicked(group: any): void;
}
