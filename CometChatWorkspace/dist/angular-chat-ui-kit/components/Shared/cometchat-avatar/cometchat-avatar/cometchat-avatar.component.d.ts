import { OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
export declare class CometchatAvatarComponent implements OnInit, OnChanges {
    private _sanitizer;
    item: any;
    avatar: any;
    userStatus: string;
    enableUserStatus: boolean;
    constructor(_sanitizer: DomSanitizer);
    ngOnChanges(change: SimpleChanges): void;
    ngOnInit(): void;
    setAvatarIfNotPresent(): void;
    getAvatar: (generator: any, data: any) => string;
    stringToColour: (str: any) => string;
}
