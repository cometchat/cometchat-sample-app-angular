import { OnInit, ElementRef } from "@angular/core";
export declare class CometchatLiveReactionsComponent implements OnInit {
    reactionName: any;
    counter: any;
    verticalSpeed: any;
    horizontalSpeed: any;
    before: any;
    items: any[];
    timer: any;
    checkAnimatedState: string;
    emojiWindow: ElementRef;
    constructor();
    ngOnDestroy(): void;
    ngOnInit(): void;
    /**
     * Sets height width speed for animation
     */
    setItems(): void;
    /**
     * Function to call animation with Timeout
     */
    requestAnimation(): void;
    /**
     * Animates
     */
    animate(): boolean;
}
