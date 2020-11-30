Steps To Start The Project :

    1. Clone the Repo

    2. cd CometChatWorkspace

    3. npm install

    4. ng build angular-chat-ui-kit ( to build the library )

    5. ng serve angular-chat-app ( parent application to use the library )

Components And Description :

    1. UserList Component :
        Description : lists all the users
        Inputs : @Input() friendsOnly = false;   can be set to fetch userList that are friends of current user
                 @Input() widgetsettings = null;  can be set for some option in the component
                 @Input() hasActions = false;     can be Set , to get actions from component to help screen logic
        OutPuts :   @Output() onUserClick : The Event emits a user that was clicked
                    @Output() actionGenerated: The Event emits The Type of action that was generated



    2. Avatar Component :
        Description : User to display the profile Image of any user in a Circular Container
        Inputs : @Input() avatar =  "some Image Url"  , the url of the profile picture Image
                 @Input() userStatus = "";    the offline ( grey dot) / online ( green dot  ) status of the user

        OutPuts : None
