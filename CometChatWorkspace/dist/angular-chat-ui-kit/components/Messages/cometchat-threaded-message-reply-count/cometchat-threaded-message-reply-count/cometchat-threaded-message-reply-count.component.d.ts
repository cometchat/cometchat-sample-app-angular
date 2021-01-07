import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatThreadedMessageReplyCountComponent implements OnInit {
    MessageDetails: any;
    actionGenerated: EventEmitter<any>;
    replies: any;
    reply: string;
    constructor();
    ngOnInit(): void;
    /**
     * get reply count for thread
     */
    getReplyCount(): any;
    /**
     * Open thread when clicked
     */
    openThreadMessage(): void;
}
