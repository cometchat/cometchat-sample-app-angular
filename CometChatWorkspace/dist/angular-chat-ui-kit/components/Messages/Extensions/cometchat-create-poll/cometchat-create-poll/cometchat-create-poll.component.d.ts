import { OnInit, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
export declare class CometchatCreatePollComponent implements OnInit {
    private fb;
    pollFormData: FormGroup;
    errorText: string;
    item: any;
    type: any;
    actionGenerated: EventEmitter<any>;
    createBtnText: string;
    CREATE_POLL: String;
    QUESTION: String;
    ENTER_YOUR_QUESTION: String;
    OPTIONS: String;
    ENTER_YOUR_OPTION: String;
    ADD_NEW_OPTION: String;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    /**
     * Used to add an extra option
     * @param
     */
    addPollOption(): void;
    /**
     * Used to remove an extra option
     * @param number index
     */
    removePollOption(index: any): void;
    getOptionsFormControls(): AbstractControl[];
    /**
     * Creates the poll
     * @param Any values
     */
    createPoll(values: any): boolean;
    /**
     * Resets Information of poll to initial conditons
     * @param
     */
    resetPollFormData(): void;
    /**
     * Emits an action to close the poll view
     * @param
     */
    closePollView(): void;
}
