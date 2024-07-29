import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { map } from 'rxjs';
import { AlertService } from 'app/services/alert.service';
import { SlideService } from '../../../../services/slide/slide.service';
import { CrearOrdenComponent } from '../orden-generica/crearOrden/crearOrden.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { OrdenGeneralService } from 'app/services/ordenGeneral/ordenGeneral.service';

declare let $: any;

@Component({
    selector: 'app-detalles',
    templateUrl: './detalles.component.html',
    styleUrls: ['./detalles.component.scss'],
})
export class PedidosDetallesComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<any>;
    pedidoAux: any = [];
    idCliente = '';
    items: any = [];
    foods: any = [
        { value: 'enSeccion', viewValue: 'En Seccion' },
        { value: 'finSecciones', viewValue: 'Finalizar Secciones' },
        { value: 'noaplica', viewValue: 'No Aplica' },
    ];
    morteros: any = [
        { value: true, viewValue: 'Si' },
        { value: false, viewValue: 'No' },
    ];

    rowDetails: any = [];
    dataOrdenes: any = [];
    @ViewChild('paginator') paginator: MatPaginator;
    budgetDetails: any = {
        columns: ['detalle', 'unidad', 'cantidad', 'precio', 'total', 'accion'],
    };
    idProject;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) private _data: { proyect },
        private _pedidosService: SlideService,
        private _matDialogRef: MatDialogRef<PedidosDetallesComponent>,
        private readonly alertService: AlertService,
        private ordenGeneralService: OrdenGeneralService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Edit
        if (this._data.proyect.idPedido) {
            // console.log(this._data.proyect.idPedido);
        }
        // Add
        else {
            let fecha = new Date();
            let idProject = localStorage.getItem('project');
            console.log(idProject);
            this.idProject = idProject;
            this._pedidosService.findOneById(idProject).subscribe(
                (value: any) => {
                    // console.log(value)
                    this.idCliente = value.ruc;
                    this.pedidoAux = {
                        id: null,
                        client: value.ruc,
                        codigo:
                            fecha.getFullYear() +
                            '' +
                            (fecha.getMonth() + 1) +
                            '' +
                            fecha.getDate() +
                            '' +
                            fecha.getTime(),
                        proyecto: value.name,
                        moduloConstruccion: 1,
                        codigoCliente: '',
                        ordenPedido: '',
                        revestimiento: '',
                        morteros: '',
                        fechaInicio: value.startDate,
                        secciones: 0,
                        descuento: 0,
                    };
                    // console.log("siii", this.pedidoAux)
                    this._changeDetectorRef.markForCheck();
                },
                (error) => {
                    this.alertService.mensajeError(error);
                }
            );
        }

        // Subscribe to pedido updates
        /*this.pedidoChanged
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                switchMap(pedido => this._pedidosService.updateOneById(pedido)))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });*/
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        /*this._unsubscribeAll.next(null);
         this._unsubscribeAll.complete();*/
    }

    onNoClick(): void {
        this._matDialogRef.close();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    updateNoteDetails(pedido: any): void {
        // console.log(pedido);

        //  this.pedidoChanged.next(note);
        this._pedidosService
            .updateOneById(pedido)
            .pipe(
                map((llego) => {
                    // console.log(llego);
                })
            )
            .subscribe();
    }

    protected readonly Math = Math;

    addFrm(pedido) {
        console.log(pedido);
        this.items = [];
        let cont = 2;
        for (var i = 0; i < pedido.secciones; i++) {
            this.items.push({
                titulo: 'SECCION ' + cont,
                tabla: [],
                tablaMostrar: [],
                denominacion1: 'LINEA MAESTRA 12 MPA CON BISEL',
                factor1: 'ML MAMPOSTERIA',
                medicion1: 'LONGITUD TOTAL DE PAREDES INTERNAS Y EXTERNAS',
                unidad1: 'ml',
                calculo1: 0,
                denominacion2: 'MAMPOSTERIA 12 MPA CON BISEL',
                factor2: 'M2 MAMPOSTERIA',
                medicion2:
                    'AREA TOTAL DE PAREDES INTERNAS Y EXTERNAS, DESCONTANDO PUERTAS Y VENTANAS ',
                unidad2: 'm2',
                calculo2: 0,
                denominacion3: 'DINTELES',
                factor3: 'ML DINTELES',
                medicion3: 'LONGITUD DE VANOS DE PUERTAS Y VENTANAS',
                unidad3: 'ml',
                calculo3: 0,
                detalles: [],
                totalPedido: 0,
                totalPeso: 0,
                showDetalles: false,
            });
            cont = cont + 2;
        }
        // console.log(this.items);
    }

    generar(pedido) {
        // console.log('POSICION A AGREGAR DATA', this.items);

        this.items.forEach((element, key) => {
            console.log('prueba elemet', element);
            element.calculo1 = 0;
            element.calculo2 = 0;
            element.calculo3 = 0;
            console.log('prueba key', key);

            /*denominacion1: 'LINEA MAESTRA 12 MPA CON BISEL',
                factor1: 'ML MAMPOSTERIA',
                medicion1: 'LONGITUD TOTAL DE PAREDES INTERNAS Y EXTERNAS',
                unidad1: 'ml',
                calculo1: 0,
                denominacion2: 'MAMPOSTERIA 12 MPA CON BISEL',
                factor2: 'M2 MAMPOSTERIA',
                medicion2:
                    'AREA TOTAL DE PAREDES INTERNAS Y EXTERNAS, DESCONTANDO PUERTAS Y VENTANAS ',
                unidad2: 'm2',
                calculo2: 0,
                denominacion3: 'DINTELES',
                factor3: 'ML DINTELES',
                medicion3: 'LONGITUD DE VANOS DE PUERTAS Y VENTANAS',
                unidad3: 'ml',
                calculo3: 0,*/

            element.tabla.forEach((element2) => {
                if (element2.detalle.includes('DINTEL')) {
                    console.log('Ingrese', element2);

                    element.denominacion3 = 'DINTELES';
                    element.calculo3 =
                        parseFloat(element.calculo3) +
                        parseFloat(element2.cantidad);
                }
                if (element2.detalle.includes('MAESTRA')) {
                    element.denominacion1 = 'LINEA MAESTRA 12 MPA CON BISEL';
                    element.calculo1 =
                        parseFloat(element.calculo1) +
                        parseFloat(element2.cantidad);
                }
                if (element2.detalle.includes('12 MPA CON BISEL')) {
                    element.denominacion2 = 'MAMPOSTERIA 12 MPA CON BISEL';
                    element.calculo2 =
                        parseFloat(element.calculo2) +
                        parseFloat(element2.cantidad);
                }
                if (element2.detalle.includes('12 MPA SIN BISEL')) {
                    element.denominacion2 = 'MAMPOSTERIA 12 MPA SIN BISEL';
                    element.calculo2 =
                        parseFloat(element.calculo2) +
                        parseFloat(element2.cantidad);
                }
                if (element2.detalle.includes('20 MPA CON BISEL')) {
                    element.denominacion2 = 'MAMPOSTERIA 20 MPA CON BISEL';
                    element.calculo2 =
                        parseFloat(element.calculo2) +
                        parseFloat(element2.cantidad);
                }
                if (element2.detalle.includes('20 MPA SIN BISEL')) {
                    element.denominacion2 = 'MAMPOSTERIA 20 MPA SIN BISEL';
                    element.calculo2 =
                        parseFloat(element.calculo2) +
                        parseFloat(element2.cantidad);
                }
            });

            console.log(element);

            let enviar = [];

            if (
                pedido.revestimiento === 'finSecciones' &&
                this.items.length - 1 === key
            ) {
                console.log('if1');
                // console.log('FIN DE SECCION');
                enviar = [
                    {
                        titulo: element.titulo,
                        morteros: pedido.morteros,
                        revestimiento: pedido.revestimiento,
                        descuento: pedido.descuento,
                        numSecciones: pedido.secciones,
                        cuantificacion: [
                            {
                                descripcion: element.denominacion1,
                                calculo: parseFloat(element.calculo1),
                            },
                            {
                                descripcion: element.denominacion2,
                                calculo: parseFloat(element.calculo2),
                            },
                            {
                                descripcion: element.denominacion3,
                                calculo: parseFloat(element.calculo3),
                            },
                        ],
                    },
                ];
            }
            if (
                pedido.revestimiento === 'finSecciones' &&
                this.items.length - 1 !== key
            ) {
                console.log('if2');
                enviar = [
                    {
                        titulo: element.titulo,
                        revestimiento: '',
                        descuento: pedido.descuento,
                        morteros: pedido.mortero,
                        numSecciones: pedido.secciones,
                        cuantificacion: [
                            {
                                descripcion: element.denominacion1,
                                calculo: parseFloat(element.calculo1),
                            },
                            {
                                descripcion: element.denominacion2,
                                calculo: parseFloat(element.calculo2),
                            },
                            {
                                descripcion: element.denominacion3,
                                calculo: parseFloat(element.calculo3),
                            },
                        ],
                    },
                ];
            } else {
                console.log('else');

                enviar = [
                    {
                        titulo: element.titulo,
                        morteros: pedido.morteros,
                        revestimiento: pedido.revestimiento,
                        descuento: pedido.descuento,
                        numSecciones: pedido.secciones,
                        cuantificacion: [
                            {
                                descripcion: element.denominacion1,
                                calculo: parseFloat(element.calculo1),
                            },
                            {
                                descripcion: element.denominacion2,
                                calculo: parseFloat(element.calculo2),
                            },
                            {
                                descripcion: element.denominacion3,
                                calculo: parseFloat(element.calculo3),
                            },
                        ],
                    },
                ];
            }

            console.log('Dtat a enviar', enviar);

            this._pedidosService.generarDetallesMateriales(enviar).subscribe(
                (value) => {
                    console.log('productossss', value);
                    element.detalles = value.pedido;
                    element.totalPedido = value.totalPedido;
                    element.totalPeso = value.pesoTotal;
                    element.showDetalles = true;
                    // console.log(element);
                    this._changeDetectorRef.markForCheck();
                },
                (error) => {
                    this.alertService.mensajeError(error);
                }
            );
        });
    }

    guardarSeccion(pedido) {
        const elementAux = this.items;
        let enviarTabla2 = {
            subtotal: 0,
            descuento: 0,
            iva: 0,
            total: 0,
            detalle: [],
            project: this.idProject,
        };
        this.items.forEach(async (element: any) => {
            const formateoSection = {
                calculo1: element.calculo1,
                calculo2: element.calculo2,
                calculo3: element.calculo3,
                denominacion1: element.denominacion1,
                denominacion2: element.denominacion2,
                denominacion3: element.denominacion3,
                detalles: element.detalles,
                factor1: element.factor1,
                factor2: element.factor2,
                factor3: element.factor3,
                medicion1: element.medicion1,
                medicion2: element.medicion2,
                medicion3: element.medicion3,
                showDetalles: element.showDetalles,
                titulo: element.titulo,
                totalPedido: element.totalPedido,
                totalPeso: element.totalPeso,
                unidad1: element.unidad1,
                unidad2: element.unidad2,
                unidad3: element.unidad3,
            };

            const enviar = {
                section: formateoSection,
                idProyecto: this.idCliente,
                purchaseOrder: pedido,
                status: 'Próximo a Iniciar',
                active: true,
                module: localStorage.getItem('module'),
            };

            console.log(elementAux);
            console.log(enviar);
            this._pedidosService.guardarSeccionesPedidos(enviar).subscribe(
                (value) => {
                    // console.log('productossss', value.pedido);
                    this._matDialogRef.close();
                },
                (error) => {
                    this.alertService.mensajeError(error);
                }
            );
            element.tabla.forEach((element) => {
                enviarTabla2.detalle.push({
                    tipoPrecio: element.tipoPrecio,
                    detalle: element.detalle,
                    cantidad: element.cantidad,
                    unidad: element.unidad,
                    precio: element.precio,
                    total: element.total,
                });
            });

            console.log('FIn', enviarTabla2);
        });
        this.calculosTabla(enviarTabla2, pedido.descuento);
        /**/
    }
    calculosTabla(tabla, decuento) {
        console.log(tabla);
        let subtotal: any = 0;
        let descuenTotal: any = 0;
        let subTotalUltimo: any = 0;
        let iva: any = 0;
        let total: any = 0;
        tabla.detalle.forEach((element) => {
            subtotal = subtotal + element.total;

            descuenTotal = (subtotal * (decuento / 100)).toFixed(2);
            subTotalUltimo = (subtotal - descuenTotal).toFixed(2);

            iva = (subTotalUltimo * (5 / 100)).toFixed(2);

            total = (parseFloat(subTotalUltimo) + parseFloat(iva)).toFixed(2);
        });
        tabla.subtotal = subtotal;
        //tabla.porcentajeDescuento = decuento;
        tabla.descuento = decuento;
        tabla.descuentoTotal = descuenTotal;
        tabla.subTotalUltimo = subTotalUltimo;
        tabla.iva = iva;
        tabla.total = total;
        console.log('TABLA A GUARDAR', tabla);
        this.ordenGeneralService
            .createOrdertProduct(tabla)
            .subscribe((data) => {
                console.log('GUARDADO', data);
                if (data.msm) {
                    this.alertService.mensajeError(
                        data.msm ? data.msm : data.message
                    );
                } else {
                    this.alertService.mensajeSuccess('Guardado Correctamente');

                    //this.routerService.navigateByUrl('/clientes');
                }
                this._changeDetectorRef.markForCheck();
            });
        this._changeDetectorRef.markForCheck();
    }

    openDialog(element): void {
        const dialogRef = this.dialog.open(CrearOrdenComponent, {
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Resultado', result);
            if (result !== undefined) {
                element.tabla.push(result);
                element.tablaMostrar = new MatTableDataSource(element.tabla);
                element.tablaMostrar.paginator = this.paginator;
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    eliminarMaterial(material, element) {
        console.log('Material', material);
        const resultado = element.tabla.filter(
            (animal) => animal.detalle != material.detalle
        );
        console.log(resultado);
        element.tabla = resultado;
        element.tablaMostrar = new MatTableDataSource(element.tabla);
        element.tablaMostrar.paginator = this.paginator;
        this._changeDetectorRef.markForCheck();
    }

    async editarMaterial(material) {
        console.log('Material', material);
        const { value: cantidad } = await Swal.fire({
            title: 'Ingrese Nueva Cantidad',
            input: 'number',
            inputLabel: 'Cantidad',
            inputPlaceholder: 'Ingrese Nueva Cantidad',
        });
        if (cantidad) {
            //Swal.fire(`Nueva Cantidad: ${cantidad}`);
            material.cantidad = cantidad;
            material.total =
                parseFloat(material.cantidad) * parseFloat(material.precio);
            material.total = parseFloat(material.total.toFixed(2));
        }
    }
}
