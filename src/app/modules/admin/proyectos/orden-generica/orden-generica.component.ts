import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { QuillViewComponent } from 'ngx-quill';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { AlertService } from 'app/services/alert.service';
import { CrearOrdenComponent } from './crearOrden/crearOrden.component';
import { OrdenGeneralService } from 'app/services/ordenGeneral/ordenGeneral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { items } from 'app/mock-api/apps/file-manager/data';
import { ProyectosService } from 'app/modules/admin/proyectos/proyectos.service';

@Component({
    selector: 'app-orden-generica',
    templateUrl: './orden-generica.component.html',
    styleUrls: ['./orden-generica.component.scss'],
})
export class OrdenGenericaComponent {
    data: any;
    dialogRef: MatDialogRef<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    budgetDetails: any = {
        columns: ['detalle', 'unidad', 'cantidad', 'precio', 'total', 'accion'],
    };
    budgetDetails1: any = {
        columns: [
            'detalle1',
            'unidad1',
            'cantidad1',
            'precio1',
            'total1',
            'accion1',
        ],
    };
    budgetDetailsSub: any = {
        columns: [
            'detalleSub',
            'unidadSub',
            'cantidadSub',
            'precioSub',
            'totalSub',
            'accionSub',
        ],
    };
    budgetDetails2: any = {
        columns: [
            'detalle2',
            'unidad2',
            'cantidad2',
            'precio2',
            'total2',
            'accion2',
        ],
    };

    budgetDetails3: any = {
        columns: [
            'detalle3',
            'unidad3',
            'cantidad3',
            'precio3',
            'total3',
            'accion3',
        ],
    };
    rowDetails: any = [];
    dataOrdenes: any = [];
    subTotal = 0;
    subTotalUltimo: any = 0;
    iva: any = 0;
    totalMateriales: any = 0;
    descuentoProveedoresPorcentaje = 12.0;
    descuentoProveedoresTotal: any = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    idProyecto;
    /*ORDEN GENERADA */
    ordenGenerada = false;
    pedido: any;
    //formato valores
    formatoValores: any;
    proyectosOp$: MatTableDataSource<any>;
    proyectosDtos: any = [];
    displayedColumns: string[] = [
        'detalle',
        'unidad',
        'cantidad',
        'precio',
        'total',
    ];
    descuento = 0
    porcentajeDescuento = ''
    project = ''
    //columnsToDisplay: string[] = this.displayedColumnsDinamico.slice();

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly alertService: AlertService,
        private ordenGeneralService: OrdenGeneralService,
        private readonly activatedRouteService: ActivatedRoute,
        private routerService: Router,
        private _inventoryService: ProyectosService,
    ) {
        
    }

    ngOnInit(): void {
        this.activatedRouteService.params.subscribe(async (parametros) => {
            console.log('PARAMETRO POR RUTA', parametros.id);
            this.idProyecto = parametros.id;
            this._changeDetectorRef.markForCheck();
        });
        this.consultarOrdenPedido();
        //this.formatoMoneda();
    }

    formatoMoneda(data) {
        const precio = data.map((item) =>
            item.precio ? { ...item, precio: +item.precio, total: +item.total } : item
        );
        const valores = precio.map((item) =>
            item.total
                ? {
                      ...item,
                      total: item.total.toLocaleString('de-DE'),
                      precio: item.precio.toLocaleString('de-DE'),
                  }
                : item
        );
        return valores;
    }

    async consultarOrdenPedido() {
        try {
            this.ordenGeneralService
                .findOneById(this.idProyecto)
                .subscribe(async (data: any) => {
                    if (data !== null) {
                        this.ordenGenerada = true;
                        console.log('datos tabla ',data);
                        let data1 = data.detalle;
                        console.log('AQUI', data1);
                        this.formatoValores = this.formatoMoneda(data1);
                        console.log('formato valores ', this.formatoValores)
                        this.pedido = data;
                        //console.log('pedido ', this.pedido)
                        this.proyectosOp$ = new MatTableDataSource(this.formatoValores);
                        this.consultarProductos()
                        //this.proyectosOp$.paginator = this.paginator2;
                        
                        this._changeDetectorRef.markForCheck();

                        return data1;
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    async consultarProductos() {
        console.log('proyectos ', this.idProyecto)
        this._inventoryService
            .findAll(this.idProyecto)
            .subscribe(async (value) => {
                console.log(value);

                value.module.forEach((element) => {
                    //let ordenedesa = [];
                    element.purchaseOrder[0].forEach((element2) => {
                        console.log('secciones ', element2.purchaseOrder[0].descuento)
                        const descuento = element2.purchaseOrder[0].descuento
                        this.porcentajeDescuento = element2.purchaseOrder[0].descuento
                        this.descuento = (+descuento/100) * (this.pedido.subtotal)
                        console.log('valor descuento ', this.descuento)
                    });
                });
            });
    }

    calcular() {
        console.log('Descuentp', this.descuentoProveedoresPorcentaje);
        this.descuentoProveedoresTotal = (
            this.subTotal *
            (this.descuentoProveedoresPorcentaje / 100)
        ).toFixed(2);
        this.subTotalUltimo = (
            this.subTotal - this.descuentoProveedoresTotal
        ).toFixed(2);
        this.iva = (this.subTotalUltimo * (5 / 100)).toFixed(2);

        this.totalMateriales = (
            parseFloat(this.subTotalUltimo) + parseFloat(this.iva)
        ).toFixed(2);
    }

    openDialog(element): void {
        const dialogRef = this.dialog.open(CrearOrdenComponent, {
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Resultado', result);
            if (result !== undefined) {
                this.subTotal = this.subTotal + result.total;
                this.descuentoProveedoresTotal = (
                    this.subTotal *
                    (this.descuentoProveedoresPorcentaje / 100)
                ).toFixed(2);
                this.subTotalUltimo = (
                    this.subTotal - this.descuentoProveedoresTotal
                ).toFixed(2);
                this.iva = (this.subTotalUltimo * (5 / 100)).toFixed(2);

                this.totalMateriales = (
                    parseFloat(this.subTotalUltimo) + parseFloat(this.iva)
                ).toFixed(2);

                this.dataOrdenes.push(result);
                this.rowDetails = new MatTableDataSource(this.dataOrdenes);
                this.rowDetails.paginator = this.paginator;
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    guardar() {
        console.log('A GUARDAR', this.dataOrdenes);
        const insert = {
            subtotal: this.subTotalUltimo,
            iva: this.iva,
            total: this.totalMateriales,
            detalle: this.dataOrdenes,
            project: this.idProyecto,
        };
        console.log('A GUARDAR', insert);

        this.ordenGeneralService
            .createOrdertProduct(insert)
            .subscribe((data) => {
                console.log('GUARDADO', data);
                if (data.msm) {
                    this.alertService.mensajeError(
                        data.msm ? data.msm : data.message
                    );
                } else {
                    this.alertService.mensajeSuccess('Guardado Correctamente');

                    this.routerService.navigateByUrl('/clientes');
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    eliminarMaterial(material) {
        console.log('Material', material);
        const resultado = this.dataOrdenes.filter(
            (animal) => animal.detalle != material.detalle
        );
        console.log(resultado);
        this.dataOrdenes = resultado;
        this.calculosTabla();
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
            this.calculosTabla();
        }
    }

    calculosTabla() {
        this.subTotal = 0;
        this.descuentoProveedoresTotal = 0;
        this.subTotalUltimo = 0;
        this.iva = 0;
        this.totalMateriales = 0;
        if (this.dataOrdenes.length > 0) {
            this.dataOrdenes.forEach((element) => {
                this.subTotal = this.subTotal + element.total;
                this.descuentoProveedoresTotal = (
                    this.subTotal *
                    (this.descuentoProveedoresPorcentaje / 100)
                ).toFixed(2);
                this.subTotalUltimo = (
                    this.subTotal - this.descuentoProveedoresTotal
                ).toFixed(2);
                this.iva = (this.subTotalUltimo * (5 / 100)).toFixed(2);

                this.totalMateriales = (
                    parseFloat(this.subTotalUltimo) + parseFloat(this.iva)
                ).toFixed(2);
            });
        }
        this.rowDetails = new MatTableDataSource(this.dataOrdenes);
        this.rowDetails.paginator = this.paginator;
        this._changeDetectorRef.markForCheck();
    }
}
