import { OnInit, SimpleChanges, EventEmitter } from "@angular/core";
export declare class CometchatSmartReplyPreviewComponent implements OnInit {
    replyPreview: any;
    actionGenerated: EventEmitter<any>;
    options: any[];
    constructor();
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * Generate the quick replies that the current user can use
     * @param Any message
     */
    generateSmartReplyOptions(message: any): void;
    /**
     * Sends the selected option as reply
     * @param
     */
    sendReplyMessage(message: any): void;
    /**
     * Closes the reply preview window
     * @param
     */
    closeReplyPreview(): void;
}
