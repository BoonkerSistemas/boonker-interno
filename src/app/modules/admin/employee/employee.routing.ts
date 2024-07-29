import { Route } from '@angular/router';
import {EmployeeComponent} from "./employee.component";

export const ingresosRoutes: Route[] = [
    {
        path: '',
        component: EmployeeComponent,
    },
];
