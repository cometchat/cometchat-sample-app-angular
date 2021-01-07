import { OnInit, EventEmitter, SimpleChanges, OnChanges } from "@angular/core";
export declare class CometchatUserDetailsComponent implements OnInit, OnChanges {
    item: any;
    type: any;
    actionGenerated: EventEmitter<any>;
    OPTIONS: String;
    DETAILS: String;
    blockUserText: string;
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    getBlockStatus(item: any): void;
    toggleBlockUser(): void;
    /**
     * Close thread when opened in small screen
     */
    closeThreadView(): void;
}
