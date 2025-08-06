import { Routes } from '@angular/router';
import { SolidifyingAngularServerComponent } from './solidifying-angular-server.component';

export const solidifyingAngularServerRoutes: Routes = [
    {
        path: '',
        component: SolidifyingAngularServerComponent,
        children: [
            {
                path: 'hydrate-on-viewport',
                loadComponent: () => import('./components/hydrate-on-viewport/hydrate-on-viewport.component')
                    .then(c => c.HydrateOnViewportComponent)
            },
            {
                path: '',
                redirectTo: 'information',
                pathMatch: 'full'
            }
        ]
    }
];