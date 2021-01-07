import { OnInit } from "@angular/core";
export declare class CometchatReadRecieptComponent implements OnInit {
    MessageDetails: any;
    displayReadReciept: boolean;
    msgSent: boolean;
    msgRead: boolean;
    msgDeliv: boolean;
    tickStatus: string;
    constructor();
    ngOnInit(): void;
    /**
     * Get  Time for message sending
     */
    getTime(): any;
    /**
     * Get Read/Deliv/Sent Status
     */
    getTick(): void;
}
