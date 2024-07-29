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
import { AlertService } from '../../../../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { InventarioService } from 'app/services/inventario/inventario.service';

@Component({
    selector: 'addInventario',
    templateUrl: './addInventario.component.html',
    styleUrls: ['./addInventario.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInventarioComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<any>;

    edit = false;
    title = 'Agregar';
    botton = 'Guardar';
    id: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /*NUevo */
    date: any = '2024-04-03T17:33:05.441Z';
    range: FormGroup;
    keyword = 'bodega';
    bodegas: any[];
    tipo: any = [];
    barras: any = '';
    name: string = '';
    cantidad: any = '';
    costoUnitario: any = '';
    costoTotal: any = '';
    unidadMedida: any = '';
    canalCompra: any = '';
    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private readonly alertService: AlertService,
        public dialogRef1: MatDialogRef<AddInventarioComponent>,
        private formBuilder: FormBuilder,
        private inventarioService: InventarioService,
        @Inject(MAT_DIALOG_DATA) public data1: any
    ) {
        this.getBodegas();
    }

    onNoClick(): void {
        this.dialogRef1.close();
    }

    ngOnInit(): void {
        this.date = new Date();
        this.range = this.formBuilder.group({
            start: [
                formatDate(this.date, 'yyyy-MM-dd', 'en'),
                [Validators.required],
            ],
        });

        this.edit = this.data1 != '';

        if (this.edit) {
            this.title = 'Editar ';
            this.editarInventario(this.data1);
        }
        this.getBodegas();
    }

    getBodegas() {
        let bodegas = [];
        this.inventarioService.findAllBodegas().subscribe((data) => {
            console.log('BODEHAST', data);
            this.bodegas = data;
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

    guardarRegion() {
        if (this.edit) {
            if (
                this.name.length === 0 ||
                this.tipo === 'Selecciona ua Bodega'
            ) {
                this.name = '';
                this.tipo = 'Selecciona una Bodega';
                this.botton = 'Guardar';
                this.title = 'Agregar';
                this.alertService.mensajeError(
                    'No se guardo el registro, completa todos los datos'
                );
                this.onNoClick();
            } else {
                this.date = this.range.value.start;
                let newDate = this.date + ' ' + '08:00';
                console.log('sadasdasdasdas', newDate);
                let edit = {
                    _id: this.id,
                    fecha: newDate,
                    bodega: this.tipo,
                    barras: this.barras,
                    name: this.name,
                    cantidad: this.cantidad,
                    costoUnitario: this.costoUnitario,
                    costoTotal: this.costoTotal,
                    unidadMedida: this.unidadMedida,
                    canalCompra: this.canalCompra,
                };
                console.log('EDITAR', edit);

                /*this.userService.updateOneById(edit).subscribe((data) => {
                    this.alertService.mensajeSuccess(
                        'Actualizado Correctamente'
                    );
                    this.ngOnInit();
                    this.name = '';
                    this.tipo = 'Selecciona una Bodega';
                    this.botton = 'Guardar';
                    this.title = 'Agregar';
                    this.dialogRef.afterClosed().subscribe((res) => {});
                });
                this.onNoClick();*/
            }

            this.edit = false;
        } else {
            this.date = this.range.value.start;
            let newDate = this.date + ' ' + '08:00';
            let insert = {
                fecha: newDate,
                bodega: this.tipo,
                name: this.name,
                barras: this.barras,
                cantidad: this.cantidad,
                costoUnitario: this.costoUnitario,
                costoTotal: this.costoTotal,
                unidadMedida: this.unidadMedida,
                canalCompra: this.canalCompra,
            };
            if (
                insert.name.length === 0 ||
                insert.bodega === 'Selecciona una Bodega'
            ) {
                this.name = '';
                this.tipo = 'Selecciona una Bodega';
                this.botton = 'Guardar';
                this.title = 'Agregar';
                this.alertService.mensajeError(
                    'No se guardo el registro, completa todos los datos'
                );
                this.onNoClick();
            } else {
                console.log('GUARDAR', insert);

                /*this.userService.create(insert).subscribe((data) => {
                    if (data.msm) {
                        this.alertService.mensajeError(
                            data.msm ? data.msm : data.message
                        );
                        this.onNoClick();
                    } else {
                        this.name = '';
                        this.tipo = 'Selecciona una Bodega';
                        this.alertService.mensajeSuccess(
                            'Guardado Correctamente'
                        );
                        this.onNoClick();
                    }
                    this.ngOnInit();

                    this.name = '';
                    this.tipo = 'Selecciona una Bodega';
                    this._changeDetectorRef.markForCheck();
                });*/
            }
        }
    }

    editarInventario(element) {
        // console.log(element);
        this.title = 'Editar';
        this.botton = 'Actualizar';
        this.date = new Date(element.fecha);
        console.log(element.fecha);
        this.range
            .get('start')
            .setValue(formatDate(this.date, 'yyyy-MM-dd', 'en'));
        // this.range.get('start').setValue(new Date(element.date));
        this.name = element.name;
        this.tipo = element.bodega[0];
        this.barras = element.barras;
        this.cantidad = element.cantidad;
        this.costoUnitario = element.costoUnitario;
        this.costoTotal = element.costoTotal;
        this.unidadMedida = element.unidadMedida;
        this.canalCompra = this.canalCompra;
        this.edit = true;
        this.id = element._id;
    }

    cerrar() {
        this.edit = false;
        this.name = '';
        this.tipo = 'Selecciona una Bodega';
        this.title = 'Agregar';
        this.botton = 'Guardar';
    }

    selectEvent(item) {
        // console.log(item);
        this.tipo = item ? item : '';
        item.deselect();
    }

    onChangeSearch(val: string) {
        // console.log(val);
    }

    onFocused(e) {
        // console.log(e);
    }
}
