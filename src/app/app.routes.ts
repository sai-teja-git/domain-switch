import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./view-page/view-page.component").then(c => c.ViewPageComponent)
    }
];
