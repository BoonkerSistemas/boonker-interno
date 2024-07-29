import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AlertService } from 'app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { DetallesMaterialesService } from '../detalles-materiales.service';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../pedidos/pedidos.service';
import { DespachosDetallesComponent } from '../../despachos/detalles/detalles.component';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrdenGeneralService } from '../../../../services/ordenGeneral/ordenGeneral.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProyectosService } from '../../proyectos/proyectos.service';

interface Food {
    value: string;
    viewValue: string;
    peso: number;
}
declare let $: any;

@Component({
    selector: 'app-detalles-materiales',
    templateUrl: './detalles.component.html',
    styleUrls: ['./detalles.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallesMaterialesComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'detalle',
        'unidad',
        'cantidad',
        'precio',
        'total',
    ];

    pedido$: Observable<any>;
    selected = '';
    dataTabla: any = [];

    foods: Food[] = [
        { value: '1', viewValue: 'Trailer', peso: 30000 },
        { value: '2', viewValue: 'Trailer Provincia', peso: 28000 },
        { value: '3', viewValue: 'Mula', peso: 24000 },
        { value: '4', viewValue: 'Mula Provincia', peso: 22000 },
        { value: '5', viewValue: 'Camion', peso: 18000 },
        { value: '6', viewValue: 'Camion Provincia', peso: 14000 },
        { value: '7', viewValue: 'Camion', peso: 8000 },
        { value: '8', viewValue: 'Camioneta', peso: 1000 },
    ];
    idPedido = '';
    dataPedido: any;
    mostrar = false;
    usuarioLogueado: any = [];
    aprobado: any;
    ordenGenerada: boolean;
    idOrder: any;
    idModulo: any;
    title = '';
    dataTablaGuias: any = [];
    ultimaguia: any = [];

    //despachos
    enviar = []
    posibleEnviar = []
    id = ''
    estadoDespacho = 'true'
    typeRolUser = ''
    idDespacho = ''
    estadoDespacho2 = 'true'
    estado = ''
    estadoBotones: any = [];
    valorTotal = 0
    detalleEnvios = []
    detallesPorEnviar = []
    tablaDetalles = false
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { proyect },
        private _detallesMaterialesService: DetallesMaterialesService,
        private _matDialogRef: MatDialogRef<DetallesMaterialesComponent>,
        private readonly alertService: AlertService,
        private readonly activatedRouteService: ActivatedRoute,
        private _pedidosService: PedidosService,
        private _matDialog: MatDialog,
        private _http: HttpClient,
        private ordenGeneralService: OrdenGeneralService,
        private _inventoryService: ProyectosService
    ) {
        this.usuarioLogueado = JSON.parse(localStorage.getItem('user'));
        this.activatedRouteService.params.subscribe(async (parametros) => {
            this.idPedido = parametros.idProject;
            this.idOrder = parametros.id;//id proyecto
            this.idModulo = parametros.idModulo;
            console.log('1', this.idPedido);
            console.log('2proyecto', this.idOrder);
            console.log('3modulo', this.idModulo);

            this.consultarProductos();
            this.consultarGuias();
            this.logicaBotones()
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.ordenGeneralService
            .findOneById(this.idOrder)
            .subscribe(async (data: any) => {
                this.ordenGenerada = true;
                console.log('Detalle pedido valores => ', data);
                let data1 = data.detalle;
                this.dataTabla = data.detalle;
                console.log('data en ngOnInit ', this.dataTabla)
                this.logicaBotones()
                //this.seccion2$ = new MatTableDataSource(data1);
                // this.seccion2$.paginator = this.paginator;
                this._changeDetectorRef.markForCheck();
                //this.cd.markForCheck();
                let usuario = JSON.parse(localStorage.getItem('user'));
                this.typeRolUser = usuario.rol[0].role;
                console.log('Usuario', this.typeRolUser);
                return data1;
            });
        // Edit
        if (this.idPedido) {
            this._pedidosService
                .findOneByIdPurchaseOrder(this.idPedido)
                .subscribe(
                    (value) => {
                        console.log('pedido', value);
                        this.dataPedido = value;
                        const pedido = {
                            id: this.dataPedido.purchaseOrder[0]._id,
                            cliente: this.dataPedido.purchaseOrder[0].client,
                            codigo: this.dataPedido.purchaseOrder[0].codigo,
                            proyecto: this.dataPedido.purchaseOrder[0].proyecto,
                            ordenDespacho:
                                this.dataPedido.purchaseOrder[0].ordenPedido,
                            modulo: this.dataPedido.purchaseOrder[0]
                                .moduloConstruccion,
                            startDate:
                                this.dataPedido.purchaseOrder[0].fechaInicio,
                        };

                        this.pedido$ = of(pedido);
                        let mio = [];

                        value.section[0].detalles.forEach((element) => {
                            mio.push({
                                order: element.order,
                                name: element.descripcion,
                                porcentaje: '',
                                unidades: element.unidades,
                                cantidad: element.cantidad,
                                peso: element.peso,
                                total: element.total,
                                cantidadCosto: 0,
                                unidadesCosto: 0,
                            });
                        });
                        // console.log('prueb', mio);

                        this.consultarDataIdDespacho(this.idPedido);

                        // this.seccion2$ = new MatTableDataSource(mio);
                        //  this._changeDetectorRef.markForCheck();
                    },
                    (error) => {
                        this.alertService.mensajeError('Error en el servicio');
                    }
                );
        }
        // Add
        else {
            // Create an empty pedido
            const pedido = {
                id: null,
                cliente: '',
                codigo: '',
                proyecto: '',
                ordenDespacho: '',
                modulo: '',
                totalP: '',
            };

            this.pedido$ = of(pedido);
        }
    }

    generardespachoInicial() {
        console.log('enviar ', this.enviar)
        console.log('enviar ', this.enviar.length === 0)
        if(this.enviar.length === 0) {
            this.ordenGeneralService.newDespachoActual(this.idOrder, this.idModulo, 1000).subscribe({
                next: (value) => {
                    //this.consultarGuias();
    
                    //this._changeDetectorRef.markForCheck();
                },
                complete: () => {
                    console.log('primer despacho creado')
                }
            });
        }else {
            return
        }
    }

    generarNewDespacho(): void {
        const dialogRef = this._matDialog.open(DespachosDetallesComponent, {
            autoFocus: false,
            data: {
                proyect: {},
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('idOrden ', this.idOrder)
            console.log('idModulo ', this.idModulo)
            console.log('peso ', result.proyect.transporte.peso)
            this.logicaBotones()

            //console.log('Enviar', enviar);
            this.ordenGeneralService.newDespachoActual(this.idOrder, this.idModulo, result.proyect.transporte.peso).subscribe({
                        next: (value:any) => {
                            console.log('DESPACHOOOOOOO', value.id);
                            console.log('DESPACHOOOOOOO', value.s.enviar);
                            console.log('DESPACHOOOOOOO', value.s.enviarPosible);
                            this.id = value.id
                            this.enviar = value.s.enviar
                            this.posibleEnviar = value.s.enviarPosible
                            // this.estadoDespacho = 'sin validar'
                            // this.estadoDespacho2 = 'sin validar'
                            //this.validarEnvio()
                            //this.cd.detectChanges();
                            this.consultarGuias();
    
                            this._changeDetectorRef.markForCheck();
                        },
                        error: (error) => {
                            this.alertService.mensajeError('Error');
                        },
                        complete: () => {
                            console.log('despacho completado')
                        }
                    },
                );
        });
        
    }

    validarEnvio() {
        this.ordenGeneralService.validarDespacho(this.idDespacho, this.idOrder).subscribe((value) => {
            console.log('notificacion ', this.id || this.idDespacho)
            console.log(value)
            //this.estadoDespacho2 = value.statusproject
            //this.validarFinanzas()
            this.logicaBotones()
            //this._changeDetectorRef.detectChanges();
        })
    }



    validarFinanzas() {
        this.ordenGeneralService.verificarValores(this.idDespacho, this.idOrder, this.valorTotal).subscribe(value => {
            console.log('finanzas notificacion ', this.idDespacho, this.idOrder)
            this.logicaBotones()
        })
    }

    notificacionFinanzas() {
        this.ordenGeneralService.sendNotificationFinanzas(this.idDespacho).subscribe(value => {
            console.log('notificacion ', value)
        })
    }

    consultarProductos() {
        this._inventoryService.findAll(this.idOrder).subscribe((value) => {
            console.log(value);
            this.title = value.name;
            this._changeDetectorRef.markForCheck();
        });
    }

    logicaBotones() {
        this.ordenGeneralService.generateDespacho(this.idModulo).subscribe(value => {
            this.estadoBotones = [value[value.length - 1]];
            this.estadoDespacho = this.estadoBotones[0].status
            console.log('logica botones => ', this.estadoDespacho)
            this._changeDetectorRef.detectChanges()
        })
    }

    saldoEnviado(ultimaGuia) {
        console.log('saldo por enviar')
        const enviadoMaestra = ultimaGuia[0].enviado.filter(item => item.descripcion.includes('MAMPUESTO ESTRUCTURAL BKR 12 MPA CON BISEL MAESTRA'))
        const porEnviarMaestra = ultimaGuia[0].porEnviar.filter(item => item.descripcion.includes('MAMPUESTO ESTRUCTURAL BKR 12 MPA CON BISEL MAESTRA'))
        console.log('enviado ', enviadoMaestra[0]?.cantidad || 0)
        this.detalleEnvios.push((enviadoMaestra[0]?.cantidad) * 144 || 0)
        console.log('detallllleeee ', this.detalleEnvios)
        //console.log('por enviar ', porEnviarMaestra[0].cantidad || 0)
        this.detallesPorEnviar.push(porEnviarMaestra[0]?.cantidad || 0)
        const enviadoBloque = ultimaGuia[0].enviado.filter(item => item.descripcion === ('MAMPUESTO ESTRUCTURAL BKR 12 MPA CON BISEL')).reduce((total, value) => total + value.cantidad, 0)
        const porEnviarBloque = ultimaGuia[0].porEnviar.filter(item => item.descripcion === ('MAMPUESTO ESTRUCTURAL BKR 12 MPA CON BISEL')).reduce((total, value) => total + value.cantidad, 0)

        const enviadoBloque2 = ultimaGuia[0].enviado.filter(item => item.descripcion === ('MAMPUESTO ESTRUCTURAL BKR 12 MPA SIN BISEL')).reduce((total, value) => total + value.cantidad, 0)
        const porEnviarBloque2 = ultimaGuia[0].porEnviar.filter(item => item.descripcion === ('MAMPUESTO ESTRUCTURAL BKR 12 MPA SIN BISEL')).reduce((total, value) => total + value.cantidad, 0)
        console.log('bloque por enviar ', porEnviarBloque)
        if(enviadoBloque || porEnviarBloque) {
            this.detallesPorEnviar.push(porEnviarBloque || 0)
            this.detalleEnvios.push(enviadoBloque || 0)

        }else {
            this.detallesPorEnviar.push(porEnviarBloque2 || 0)
            this.detalleEnvios.push(enviadoBloque2 || 0)
        }


        const porEnviarDintel = ultimaGuia[0].porEnviar.filter(item => item.descripcion.includes('DINTEL CONCRETO ARMADO'))
        const enviadoDintel = ultimaGuia[0].enviado.filter(item => item.descripcion.includes('DINTEL CONCRETO ARMADO'))
        console.log('por enviar ', porEnviarDintel[0]?.cantidad || 0)
        this.detallesPorEnviar.push(porEnviarDintel[0]?.cantidad || 0)
        this.detalleEnvios.push(enviadoDintel[0]?.cantidad || 0)
        const porEnviarGN = ultimaGuia[0].porEnviar.filter(item => item.descripcion.includes('GROUT DE NIVELACIÓN MAESTRA'))
        const enviarGN = ultimaGuia[0].enviado.filter(item => item.descripcion.includes('GROUT DE NIVELACIÓN MAESTRA'))
        console.log('por enviar ', porEnviarGN[0]?.cantidad || 0)
        this.detallesPorEnviar.push(porEnviarGN[0]?.cantidad || 0)
        this.detalleEnvios.push(enviarGN[0]?.cantidad || 0)
        const enviarGE = ultimaGuia[0].enviado.filter(item => item.descripcion.includes('GROUT ESTRUCTURAL ESTANDAR')).reduce((total, value) => total + value.cantidad, 0)
        const porEnviarGE = ultimaGuia[0].porEnviar.filter(item => item.descripcion.includes('GROUT ESTRUCTURAL ESTANDAR')).reduce((total, value) => total + value.cantidad, 0)
        //console.log('por enviar ', porEnviarGE[0].cantidad || 0)
        this.detallesPorEnviar.push(porEnviarGE || 0)
        this.detalleEnvios.push(enviarGE || 0)
        console.log('detalle envio ', this.detalleEnvios)
        this.tablaDetalles = true
        // this.ordenGeneralService.findOneById(this.idOrder).subscribe((data: any) => {
        //     console.log('valor enviado maestra => ', enviadoMaestra[0].cantidad)
        //     console.log('valor por enviar maestra => ', porEnviarMaestra[0]?.cantidad || 0)
        //     this.detalleEnvios = [(enviadoMaestra[0].cantidad * 144), 0, 0, 0, 0]
        //     console.log('datos saldos ', data.detalle.map(item => item.cantidad)[0])
        //     const valor1 = data.detalle.map(item => item.cantidad)[0]
        //     const valor2 = (data.detalle.map(item => item.cantidad)[1]) * 8.09
        //     this.detallesPorEnviar = [valor1 - this.detalleEnvios[0], valor2, 0, 0, 0]
        //     console.log('por enviaarrr => ', this.detallesPorEnviar)
        // })
    }

    consultarGuias() {
        console.log('id mooodulooo ', this.idModulo)
        this.ordenGeneralService
            .generateDespacho(this.idModulo)
            .subscribe((value) => {
                console.log('Guias', value);
                this.ultimaguia = [value[value.length - 1]];

                console.log(value.length - 1);
                console.log('despacho guias ', this.ultimaguia);
                this.saldoEnviado(this.ultimaguia)
                const subtotal = this.ultimaguia[0].enviado.reduce((total, value) => total + value.total, 0)
                const iva = +subtotal * 0.15
                const total = (+((subtotal + iva).toFixed(1)))
                console.log('valor ', total)
                this.valorTotal = total
                localStorage.setItem('valorTotal', total.toString())
                this.idDespacho = this.ultimaguia[0]._id
                console.log('id despacho ', this.idDespacho)
                this.dataTablaGuias = value;
                //this.title = value.name;
                this._changeDetectorRef.markForCheck();
                //this.logicaBotones()
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        /*this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();*/
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    addNewDespacho(): void {
        const dialogRef = this._matDialog.open(DespachosDetallesComponent, {
            autoFocus: false,
            data: {
                proyect: {},
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            // console.log(result);

            const enviar = {
                transporteSeleccionado: result.proyect.transporte.peso,
                dataPedido: this.dataPedido,
            };

            // console.log('Enviar', enviar);
            this._detallesMaterialesService.generarDespacho(enviar).subscribe(
                (value) => {
                    console.log('productossss', value);
                    const mio = [];
                    const mio2 = [];
                    value.despachar.forEach((element) => {
                        mio.push({
                            cantidad: element.cantidad,
                            name: element.descripcion,
                            despachado: element.despachado,
                            despachar: element.despachar,
                            estadoPedido: element.estadoPedido,
                            idOp: element.idOp,
                            order: element.order,
                            peso: element.peso,
                            precio: element.precio,
                            sobrante: element.sobrante,
                            total: element.total,
                            unidades: element.unidades,
                            fechaDespacho1:
                                result.proyect.fechaEstimadaDespachos,
                            fechaDespacho2: '',
                        });
                    });

                    value.sobrante.forEach((element) => {
                        mio2.push({
                            cantidad: element.cantidad,
                            name: element.descripcion,
                            despachado: element.despachado,
                            /*despachar: element.despachar,*/
                            estadoPedido: element.estadoPedido,
                            idOp: element.idOp,
                            order: element.order,
                            peso: element.peso,
                            precio: element.precio,
                            sobrante: element.sobrante,
                            total: element.total,
                            unidades: element.unidades,
                        });
                    });
                    // console.log('prueb', mio2);

                    this.mostrar = true;

                    this.aprobado = mio;

                    //this.seccion3$ = new MatTableDataSource(mio);
                    //this.seccion4$ = new MatTableDataSource(mio2);
                    this._changeDetectorRef.markForCheck();
                },
                (error) => {
                    this.alertService.mensajeError('Error');
                }
            );
        });
    }

    consultarDataIdDespacho(id: any) {
        this._detallesMaterialesService.consultarDespachos(id).subscribe({
            next: (value) => {
                // console.log('despachos', value);
                this._changeDetectorRef.markForCheck();
            },
            error: (error) => {
                this.alertService.mensajeError('Error');
            }

        });
    }

    aprobar() {
        let self = this;
        Swal.fire({
            title: 'Despacho a Generar?',
            text: 'Estas seguro del despacho a seleccionar!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Si!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const url = environment.url + 'send-product';
                let newOrder = {
                    iva: true,
                    subtotal: true,
                    total: true,
                    dateApproval: new Date(),
                    datePay: new Date(),
                    active: true,
                    commets: 'true',
                    purchaseOrder: this.aprobado,
                    module: this.idPedido,
                    status: 'Pendiente de aprobación',
                };

                return this._http.post<any>(url, newOrder).subscribe((data) => {
                    // console.log("asdasdasdasdasdasdasdas")
                });
            }
        });
    }
}
