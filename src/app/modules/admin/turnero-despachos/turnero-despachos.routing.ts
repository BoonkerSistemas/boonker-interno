import { Route } from '@angular/router';
import { TurneroDespachosComponent } from './turnero-despachos.component';
import {DespachosObraFormComponent} from "./despachos-obra-form/despachos-obra-form.component";

export const turneroDespachosRoutes: Route[] = [
    {
        path: '',
        component: TurneroDespachosComponent,
    },
    {
        path: 'despachos-board/:id',
        component: DespachosObraFormComponent,
    },
];
