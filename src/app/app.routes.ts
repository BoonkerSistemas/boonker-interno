import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'example' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.routes'
                    ),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.routes'
                    ),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.routes'
                    ),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.routes'),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.routes'),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.routes'),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.routes'
                    ),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/landing/home/home.routes'),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () =>
                    import('app/modules/admin/example/example.routes'),
            },
            {
                path: 'config/user',
                loadChildren: () =>
                    import('app/modules/admin/usuarios/usuarios.module').then(
                        (m) => m.UsuariosModule
                    ),
            },
            {
                path: 'config/role',
                loadChildren: () =>
                    import('app/modules/admin/roles/roles.module').then(
                        (m) => m.RolesModule
                    ),
            },
            {
                path: 'clientes',
                loadChildren: () =>
                    import('app/modules/admin/cliente/cliente.module').then(
                        (m) => m.ClienteModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('app/modules/admin/slide/slide.module').then(
                        (m) => m.SlideModule
                    ),
            },
            {
                path: 'proyectos/:id',
                loadChildren: () =>
                    import('app/modules/admin/proyectos/proyectos.module').then(
                        (m) => m.ProyectosModule
                    ),
            },
            {
                path: 'proyectos',
                loadChildren: () =>
                    import('app/modules/admin/proyectos/proyectos.module').then(
                        (m) => m.ProyectosModule
                    ),
            },

            {
                path: 'detallesMateriales',
                loadChildren: () =>
                    import(
                        'app/modules/admin/detalles-materiales/detalles-materiales.module'
                    ).then((m) => m.DetallesMaterialesModule),
            },
            {
                path: 'despachos',
                loadChildren: () =>
                    import('app/modules/admin/despachos/despachos.module').then(
                        (m) => m.DespachosModule
                    ),
            },
            {
                path: 'academy/:id',
                loadChildren: () =>
                    import('app/modules/admin/academy/academy.module').then(
                        (m) => m.AcademyModule
                    ),
            },
            {
                path: 'file-upload/:id',
                loadChildren: () =>
                    import(
                        'app/modules/admin/slide/list-upload/list-upload.module'
                    ).then((m) => m.ListUploadModule),
            },
            {
                path: 'upload-file/:id',
                loadChildren: () =>
                    import(
                        'app/modules/admin/slide/upload-file/upload-file.module'
                    ).then((m) => m.UploadFileModule),
            },

            {
                path: 'graficas',
                loadChildren: () =>
                    import(
                        'app/modules/dashboards/project/project.module'
                    ).then((m) => m.ProjectModule),
            },

            {
                path: 'stock',
                loadChildren: () =>
                    import('app/modules/admin/stock/stock.module').then(
                        (m) => m.StockModule
                    ),
            },

            {
                path: 'ingresos',
                loadChildren: () =>
                    import('app/modules/admin/ingresos/ingresos.module').then(
                        (m) => m.IngresosModule
                    ),
            },

            {
                path: 'despacho-productos',
                loadChildren: () =>
                    import(
                        'app/modules/admin/despacho-producto/despacho-producto.module'
                    ).then((m) => m.DespachoProductoModule),
            },

            {
                path: 'turnero-despachos',
                loadChildren: () =>
                    import(
                        'app/modules/admin/turnero-despachos/turnero-despachos.module'
                    ).then((m) => m.TurneroDespachosModule),
            },
            {
                path: 'turnero-despachos-general',
                loadChildren: () =>
                    import(
                        'app/modules/admin/general-view-dispatch/general-view-dispatch.module'
                        ).then((m) => m.GeneralViewDispatchModule),
            },
            {
                path: 'inventario-boonker',
                loadChildren: () =>
                    import(
                        'app/modules/admin/inventario/inventario.module'
                        ).then((m) => m.InventarioModule),
            },

            {
                path: 'tthh',
                loadChildren: () =>
                    import(
                        'app/modules/admin/employee/employee.module'
                        ).then((m) => m.EmployeeModule),
            },
            {
                path: 'escaner-qr',
                loadChildren: () =>
                    import(
                        'app/modules/admin/escaner/escaner.module'
                        ).then((m) => m.EscanerModule),
            },
            {
                path: 'ingresos-personal-bkn',//nueva vista
                loadChildren: () =>
                    import(
                        'app/modules/admin/visitas/visitas.module'
                        ).then((m) => m.VisitasModule),
            },
        ],
    },
];
