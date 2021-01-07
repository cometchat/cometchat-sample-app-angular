import { OnInit } from "@angular/core";
export declare class CometchatUserProfileComponent implements OnInit {
    user: any;
    name: string;
    MORE: String;
    ONLINE: String;
    PREFERENCES: String;
    NOTIFICATIONS: String;
    PRIVACY_AND_SECURITY: String;
    CHATS: String;
    OTHER: String;
    HELP: String;
    REPORT_PROBLEM: String;
    constructor();
    ngOnInit(): void;
    getProfile(): void;
}
