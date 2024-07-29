/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps.User',
        title: 'Configuracion Usuarios',
        type: 'collapsable',
        code: 'US1',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'apps.time',
                title: 'Usuarios',
                type: 'basic',
                code: 'Notificaciones',
                icon: 'heroicons_outline:user',
                link: '/config/user',
            },
            {
                id: 'apps.timeuser',
                title: 'Roles',
                type: 'basic',
                code: 'Notificaciones',
                icon: 'heroicons_outline:user',
                link: '/config/role',
            },
        ],
    },

    {
        id: 'cliente',
        title: 'Cliente',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/clientes',
        code: 'Notificaciones',
    },

    {
        id: 'Graficas',
        title: 'Inventario Productos',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/graficas',
    },

    {
        id: 'RRHH',
        title: 'Carnet Digital',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/tthh',
    },

    {
        id: 'QR Code',
        title: 'Escaner QR',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/escaner-qr',
    },
    {
        id: 'ControlIngreso',
        title: 'Registro de Ingreso',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/ingresos-personal-bkn',
    },

    {
        id: 'Cronograma de  Despachos',
        title: 'Bitácora de Despachos Diaria',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/turnero-despachos',
    },
    {
        id: 'Cronograma de  Despachos q',
        title: 'Bitácora de Despachos Semanal',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/turnero-despachos-general',
    },
    {
        id: 'INVPROD',
        title: 'Inventario Boonker',
        type: 'basic',
        code: '',
        icon: 'heroicons_outline:truck',
        link: '/inventario-boonker',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'apps.User',
        title: 'Configuracion Usuarios',
        type: 'collapsable',
        code: 'US1',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'apps.time',
                title: 'Usuarios',
                type: 'basic',
                code: 'Notificaciones',
                icon: 'heroicons_outline:user',
                link: '/config/user',
            },
            {
                id: 'apps.timeuser',
                title: 'Roles',
                type: 'basic',
                code: 'Notificaciones',
                icon: 'heroicons_outline:user',
                link: '/config/role',
            },
        ],
    },
    {
        id: 'cliente',
        title: 'Cliente',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/clientes',
        code: 'Notificaciones',
    },
    {
        id: 'project',
        title: 'Proyectos',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/projects',
        code: 'Notificaciones',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example5',
        title: 'Example',
        type: 'basic',
        code: 'Notificaciones',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        code: 'Notificaciones',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
