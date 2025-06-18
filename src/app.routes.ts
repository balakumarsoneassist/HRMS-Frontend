import { UserdashboardComponent } from './app/pages/donar-app/userdashboard/userdashboard.component';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/pages/donar-app/services/auth.guard';

export const appRoutes: Routes = [
    // {
    //     path: '',
    //     component: AppLayout,// ✅ only admins can access
    //     children: [
    //         {
    //             path: '', component: Dashboard, canActivate: [AuthGuard],
    //             data: { roles: ['admin'] }
    //         },
    //         { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
    //         { path: 'documentation', component: Documentation },
    //         { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    //         { path: 'app', loadChildren: () => import('./app/pages/donar-app/donar-app-routing.module') },
    //         { path: 'crm', loadChildren: () => import('./app/pages/crm/app/crm-routing.module') },

    //     ]
    // },
// {
//         path: '',
//         component: AppLayout,// ✅ only admins can access
//         children: [
//     { path: 'crm', loadChildren :() => import('./app/pages/crm/app/crm-routing.module') },

//         ]}
    // { path: 'landing', component: Landing },
    { path: '', loadChildren :() => import('./app/pages/crm/app/crm-routing.module') },

    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' },

];
