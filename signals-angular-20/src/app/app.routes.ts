import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'new-experimental-apis',
        loadComponent: () => import('./pages/new-experimental-apis/new-experimental-apis.component').then(c => c.NewExperimentalApisComponent)
    },
    {
        path: 'promoting-zoneless',
        loadComponent: () => import('./pages/promoting-zoneless/promoting-zoneless.component').then(c => c.PromotingZonelessComponent)
    },
    {
        path: 'solidifying-angular-server',
        loadComponent: () => import('./pages/solidifying-angular-server/solidifying-angular-server.component').then(c => c.SolidifyingAngularServerComponent)
    },
    {
        path: 'polishing-developer-experience',
        loadComponent: () => import('./pages/polishing-developer-experience/polishing-developer-experience.component').then(c => c.PolishingDeveloperExperienceComponent)
    },
    {
        path: 'deprecation-ngif-ngfor-ngswitch',
        loadComponent: () => import('./pages/deprecation-ngif-ngfor-ngswitch/deprecation-ngif-ngfor-ngswitch.component').then(c => c.DeprecationNgifNgforNgswitchComponent)
    },
    {
        path: 'services-signals',
        loadComponent: () => import('./pages/signals-service/signals-service.component').then(c => c.SignalsServiceComponent)
    },
    {
        path: '',
        redirectTo: 'new-experimental-apis',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'new-experimental-apis'
    }
];