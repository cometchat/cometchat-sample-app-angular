import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatImageViewerComponent implements OnInit {
    MessageDetails: any;
    open: any;
    actionGenerated: EventEmitter<any>;
    imageUrl: string;
    constructor();
    ngOnInit(): void;
    getUrl(): void;
    close(): void;
}
