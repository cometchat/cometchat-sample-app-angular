import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { CometchatEmbededComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-embeded/cometchat-embeded.component';
import { ContactListComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/contact-list/contact-list.component';
import { GroupListComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/group-list/group-list.component';
import { ConversationsListComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/conversations-list/conversations-list.component';
import { StatusIndicatorComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/status-indicator/status-indicator.component';
import { AppNavigationComponentComponent } from './app-navigation-component/app-navigation-component.component';
import { AppHomeCompoenentComponent } from './app-home-compoenent/app-home-compoenent.component';

import { AppGroupScreenComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-group-list-screen/app-group-screen.component';

import { AppConversationScreenComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-conversation-list-screen/app-conversation-screen.component';
import { DemoUserViewComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/demo-user-view/demo-user-view.component';
import { AppContactScreenComponent } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-user-list-screen/app-contact-screen.component';


const routes: Routes = [
    {
        path: 'embeded-app',
        component: CometchatEmbededComponent
    }, {
        path: 'contact-list',
        component: ContactListComponent
    },
    {
        path: 'group-list',
        component: GroupListComponent
    },
    {
        path: 'conversations-list',
        component: ConversationsListComponent
    },
    {
        path: 'status-indicator',
        component: StatusIndicatorComponent
    }, {
        path: 'menu',
        component: AppNavigationComponentComponent
    }, {
        path: '',
        component: AppHomeCompoenentComponent
    },
    {
        path: 'contact-screen',
        component: AppContactScreenComponent
    }
    ,
    {
        path: 'group-screen',
        component: AppGroupScreenComponent
    }
    ,
    {
        path: 'conversation-screen',
        component: AppConversationScreenComponent
    }, {
        path: 'components',
        component: DemoComponent
    }
    , {
        path: 'status-indicator',
        component: StatusIndicatorComponent
    },
    {
        path: 'user-view',
        component: DemoUserViewComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
