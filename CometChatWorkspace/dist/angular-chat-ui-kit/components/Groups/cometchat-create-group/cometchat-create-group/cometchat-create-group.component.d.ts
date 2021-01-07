import { OnInit, EventEmitter } from "@angular/core";
export declare class CometchatCreateGroupComponent implements OnInit {
    error: any;
    passwordInput: boolean;
    name: String;
    type: String;
    password: string;
    createBtnText: String;
    SELECT_GROUP_TYPE: String;
    ENTER_GROUP_NAME: String;
    PUBLIC: String;
    PRIVATE: String;
    PASSWORD_PROTECTED: String;
    ENTER_GROUP_PASSWORD: String;
    CREATE_GROUP: String;
    actionGenerated: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    /**
     * Changes the password according to the text entered by the user
     * @param Event event
     */
    passwordChangeHandler(event: any): void;
    /**
     * Changes the Group Name according to the text entered by the user
     * @param Event event
     */
    nameChangeHandler(event: any): void;
    /**
     * Changes the Type of  according to the option seletced by the user by the user
     * @param Event event
     */
    typeChangeHandler(event: any): void;
    /**
     * Validates all the group details that were entered before creating the group
     * @param
     */
    validate: () => boolean;
    /**
     * If the Group Data is successfully validated , below function creates the group
     * @param
     */
    createGroup(): boolean;
    /**
     * Emits an action indicating the parent to close the create group view
     * @param
     */
    closeCreateGroupView(): void;
    /**
     * Resets all the Group creation form data to initial values
     * @param
     */
    resetGroupData(): void;
}
