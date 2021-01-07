import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatStickerKeyboardComponent implements OnInit {
    actionGenerated: EventEmitter<any>;
    decoratorMessage: string;
    loading: boolean;
    stickerList: any[];
    stickerSet: {};
    activeStickerList: any[];
    activeStickerSet: any;
    categoryStickerUrl: any[];
    constructor();
    ngOnInit(): void;
    /**
     * Fetches all the information of stickers
     */
    getStickers(): void;
    /**
     * Gets The sticker collection when sticker category is changed
     * @param
     */
    stickerSetClicked(sectionItem: any): void;
    /**
     * Sends Sticker as Message
     * @param
     */
    sendStickerMessage(stickerItem: any): void;
    /**
     * Close Sticker Window
     * @param
     */
    closeStickerWindow(message: any): void;
}
