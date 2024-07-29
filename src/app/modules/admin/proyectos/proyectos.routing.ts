import { Route } from '@angular/router';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ListUploadComponent } from '../slide/list-upload/list-upload.component';
import { OrdenGenericaComponent } from './orden-generica/orden-generica.component';

export const proyectosRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: ListaProyectosComponent,
    },
    {
        path: 'proyectos/:id',
        component: ListaProyectosComponent,
        children: [],
    },
    {
        path: 'file-upload/:id',
        component: ListUploadComponent,
        children: [],
    },

    {
        path: 'ordenGenerica/:id',
        component: OrdenGenericaComponent,
        children: [],
    },
];
