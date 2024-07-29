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
import { Observable, Subject } from 'rxjs';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AlertService } from 'app/services/alert.service';
import { environment } from 'environments/environment';
import { OrdenGeneralService } from 'app/services/ordenGeneral/ordenGeneral.service';

@Component({
    selector: 'app-crear-orden',
    templateUrl: './crearOrden.component.html',
    styleUrls: ['./crearOrden.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearOrdenComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<any>;
    cantidad: string = '';
    unidad: string = '';
    precio: any = '';
    total: any = 0.0;
    keyword = 'descrip';
    productosData: any[];
    tipo: any = [];
    id: any;
    anio: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    keywordPrecio = 'name';
    dataPrecio = [
        // {
        //     id: 1,
        //     name: '2022',
        // },
        // {
        //     id: 2,
        //     name: '2023',
        // },
        {
            id: 3,
            name: '2024',
        },
    ];
    tipoPrecio: any = [
        {
            id: 1,
            name: '2022',
        },
        {
            id: 2,
            name: '2023',
        },
        {
            id: 3,
            name: '2024',
        },
    ];

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly alertService: AlertService,
        public dialogRef1: MatDialogRef<CrearOrdenComponent>,
        private ordenGeneralService: OrdenGeneralService,
        @Inject(MAT_DIALOG_DATA) public data1: any
    ) {
        this.getProductos();
    }

    onNoClick(): void {
        this.dialogRef1.close();
    }

    ngOnInit(): void {
        //this.edit = this.data1 != "";
        // console.log('LLEGA', this.data1);
        //this.getProductos();
    }

    getProductos() {
        let productos = [];
        this.ordenGeneralService.findAllProductos().subscribe((data) => {
            // console.log('PRODUCTOSSSS', data);

            data.forEach((item) => {
                item.descrip = item.DESCRIPCION;
            });
            this.productosData = data;
        });

        // this.rol = this.rol.filter(data=> {data.active === true})
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

    guardarRegion() {
        let insert = {
            tipoPrecio: this.tipoPrecio,
            detalle: this.tipo.descrip,
            cantidad: this.cantidad,
            unidad: this.unidad,
            precio: this.precio,
            total: this.total,
        };
        console.log('INSERTAR', insert);

        this.dialogRef1.close(insert);

        /*this.userService.create(insert).subscribe((data) => {
                    if (data.msm) {
                        this.alertService.mensajeError(data.msm ? data.msm : data.message);
                        this.onNoClick();
                    } else {
                        this.unidad = "";
                        this.cantidad = "";
                        this.precio = "";
                        this.total = "";
                        this.alertService.mensajeSuccess("Guardado Correctamente");
                        this.onNoClick();
                    }
                    this.ngOnInit();

                    this.unidad = "";
                    this.cantidad = "";
                    this.precio = "";
                    this.total = "";
                    this._changeDetectorRef.markForCheck();
                });*/
    }

    selectEvent(item) {
        console.log('productos => ', item)
        this.unidad = item.UNIDAD;

        if (this.tipoPrecio === '2022') {
            this.precio = item.PRECIO2022;
        }
        if (this.tipoPrecio === '2023') {
            this.precio = item.PRECIO2023;
        }
        if (this.tipoPrecio === '2024') {
            this.precio = item.PRECIO2024;
        }

        this.tipo = item ? item : '';
        item.deselect();
    }

    onChangeSearch(val: string) {}

    onFocused(e) {
        // console.log(e);
    }

    selectEventPrecio(item) {
        this.tipoPrecio = item.name ? item.name : '2024';
        item.deselect();
    }

    onChangeSearchPrecio(val: string) {
        // console.log(val);
    }

    onFocusedPrecio(e) {
        // console.log(e);
    }

    calcular(aa) {
        this.total = parseFloat(this.cantidad) * parseFloat(this.precio);
        this.total = parseFloat(this.total.toFixed(2));
        console.log(typeof this.total);
    }
}
