import { Route } from '@angular/router';
import { AcademyComponent } from 'app/modules/admin/academy/academy.component';
import { AcademyListComponent } from 'app/modules/admin/academy/list/list.component';
import { AcademyDetailsComponent } from 'app/modules/admin/academy/details/details.component';
import {
    AcademyCategoriesResolver,
    AcademyCourseResolver,
    AcademyCoursesResolver,
} from 'app/modules/admin/academy/academy.resolvers';
import { CrearProyectoComponent } from './crear/crear.component';
import { CarpetasComponent } from './carpetas/carpetas.component';
import { DetailsCarpetasComponent } from './carpetas/details/details.component';
import { CanDeactivateDetailsCarpetas } from './carpetas/carpetas.guards';
import { VisitaObraComponent } from './visita-obra/visita-obra.component';
import { VisitaObraFormComponent } from './visita-obra-form/visita-obra-form.component';

export const academyRoutes: Route[] = [
    {
        path: '',
        component: AcademyComponent,
        /*resolve  : {
            categories: AcademyCategoriesResolver
        },*/
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AcademyListComponent,
                /*resolve  : {
                    courses: AcademyCoursesResolver
                }*/
            },
            {
                path: 'crear-proyecto',
                component: CrearProyectoComponent,
            },
            {
                path: 'crear-proyecto/:id',
                component: CrearProyectoComponent,
            },
            {
                path: 'carpetas/:id',
                component: CarpetasComponent,
                children: [
                    {
                        path: 'details/:id',
                        component: DetailsCarpetasComponent,
                        canDeactivate: [CanDeactivateDetailsCarpetas],
                    },
                ],
            },

            {
                path: 'visita-obra/:idProyect',
                component: VisitaObraComponent,
            },
            {
                path: 'visita-obra-form/:idProyect',
                component: VisitaObraFormComponent,
            },
        ],
    },
];
