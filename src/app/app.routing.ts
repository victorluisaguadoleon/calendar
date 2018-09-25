import { Routes, RouterModule } from '@angular/router';

import { HomeViewComponent } from './views/home/home-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeViewComponent
    },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes);
