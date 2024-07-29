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
import { Subject } from 'rxjs';
import { AlertService } from 'app/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { QuillViewComponent } from 'ngx-quill';
import { UserService } from '../../../../services/user/user.service';
import { ClientService } from '../../../../services/client/client.service';
import { UploadService } from '../../../../services/upload/upload.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TurneroDespachosService } from '../../../../services/turneroDespachos/turneroDespachos.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-detalles-turnero',
    templateUrl: './detallesTurnero.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallesTurneroComponent implements OnInit, OnDestroy {
    data: any;
    dialogRef: MatDialogRef<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('editorText') editorText!: QuillViewComponent;
    /*range = new FormGroup({
        start: new FormControl<'' | any>(null),
    });*/

    estado: boolean = false;
    keyword = 'tipo';
    vehiculo: any = [
        { tipo: 'Camioneta' },
        { tipo: 'Camion' },
        { tipo: 'Mula' },
        { tipo: 'Trailer' },
    ];

    estados: any = [
        { tipo: 'Preliminar' },
        { tipo: 'Confirmado' },
        { tipo: 'Anulado' },
        { tipo: 'Despachado' },
        { tipo: 'Reprogramado' },
    ];

    keyword1 = 'tipo';
    mpab: any = [{ tipo: '12' }, { tipo: '20' }];

    date: any = '2024-04-03T17:33:05.441Z';
    client = '';
    direction = '';
    driver: any = [];
    m2 = 0;
    mpa = 0;
    morterosCat = '';
    dinteles = false;
    status = '';
    confirmation = true;
    personUpdate = '';
    updatedAt = '2024-04-03T17:34:40.860Z';

    edit = false;

    title = 'Agregar';
    botton = 'Guardar';

    crearProgramaFormGroup: FormGroup;
    progress = 0;
    imageUrlDesktop = '';
    message: any;

    previewMobil = '';
    preview = '';
    id: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    rol: any[];
    lastName: any;
    locationUser: any;
    phone: any;
    phone2: any;
    newBloc: boolean = false;
    ruc: any;
    selectedFiles?: FileList;
    currentFile?: File;
    urlImagen = '';
    morteros: any;
    driverSelect: any = [];
    range: FormGroup;

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private userService: TurneroDespachosService,
        private readonly alertService: AlertService,
        private uploadService: UploadService,
        public dialogRef1: MatDialogRef<DetallesTurneroComponent>,
        @Inject(MAT_DIALOG_DATA) public data1: any,
        private _matDialog: MatDialog,
        private formBuilder: FormBuilder
    ) {}

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

        //this.range.get('start').patchValue(this.date);

        this.edit = this.data1 != '' && this.data1 != null;

        if (this.edit) {
            this.title = 'Editar ';
            this.editarRegion(this.data1);
        }
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
            if (this.date.length === 0 || this.client.length === 0) {
                this.date = '';
                this.client = '';
                this.direction = '';
                this.driver = '';
                this.m2 = 0;
                this.mpa = 0;

                this.morterosCat = '';
                this.dinteles = true;
                this.status = '';
                this.confirmation = true;
                this.personUpdate = '';
                this.updatedAt = '';
                this.newBloc = false;
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
                    date: newDate,
                    client: this.client,
                    direction: this.direction,
                    driver: this.driver,
                    m2: this.m2,
                    mpa: this.mpa,
                    morterosCat: this.morterosCat,
                    dinteles: this.dinteles,
                    status: this.status,
                    newBloc: this.newBloc,
                    confirmation: this.confirmation,
                    personUpdate: JSON.parse(localStorage.getItem('user')).name,
                    updatedAt: this.updatedAt,
                };
                console.log(edit);

                console.log(this.range.value.start);

                this.userService.updateOneById(edit).subscribe((data) => {
                    this.alertService.mensajeSuccess(
                        'Actualizado Correctamente'
                    );
                    this.ngOnInit();
                    this.date = '';
                    this.client = '';
                    this.direction = '';
                    this.driver = '';
                    this.m2 = 0;
                    this.mpa = 0;
                    this.morteros = 0;
                    this.morterosCat = '';
                    this.dinteles = true;
                    this.status = '';
                    this.newBloc = false;
                    this.confirmation = true;
                    this.personUpdate = '';
                    this.updatedAt = '';
                    this.botton = 'Guardar';
                    this.title = 'Agregar';
                    this.dialogRef.afterClosed().subscribe((res) => {
                        // console.log(res)
                    });
                });
                this.onNoClick();
            }

            this.edit = false;
        } else {
            this.date = this.range.value.start;
            let newDate = this.date + ' ' + '08:00';

            let insert = {
                date: newDate,
                client: this.client,
                direction: this.direction,
                driver: this.driver,
                m2: this.m2,
                mpa: this.mpa,
                morterosCat: this.morterosCat,
                dinteles: this.dinteles,
                status: this.status,
                newBloc: this.newBloc,
                confirmation: this.confirmation,
                personUpdate: JSON.parse(localStorage.getItem('user')).name,
                updatedAt: this.updatedAt,
            };
            console.log('A GUARDAR', insert);

            if (this.date.length === 0 || this.client.length === 0) {
                this.date = '';
                this.client = '';
                this.direction = '';
                this.driver = '';
                this.m2 = 0;
                this.mpa = 0;
                this.morterosCat = '';
                this.dinteles = true;
                this.status = '';
                this.confirmation = true;
                this.personUpdate = '';
                this.updatedAt = '';
                this.newBloc = false;
                this.botton = 'Guardar';
                this.title = 'Agregar';
                this.alertService.mensajeError(
                    'No se guardo el registro, completa todos los datos'
                );
                this.onNoClick();
            } else {
                this.userService.create(insert).subscribe((data) => {
                    if (data.msm) {
                        this.alertService.mensajeError(
                            data.msm ? data.msm : data.message
                        );
                        this.onNoClick();
                    } else {
                        this.date = '';
                        this.client = '';
                        this.direction = '';
                        this.driver = '';
                        this.m2 = 0;
                        this.mpa = 0;
                        this.morterosCat = '';
                        this.dinteles = true;
                        this.status = '';
                        this.confirmation = true;
                        this.personUpdate = '';
                        this.newBloc = false;
                        this.updatedAt = '';
                        this.botton = 'Guardar';
                        this.alertService.mensajeSuccess(
                            'Guardado Correctamente'
                        );
                        this.onNoClick();
                    }
                    this.ngOnInit();

                    this.date = '';
                    this.client = '';
                    this.direction = '';
                    this.driver = '';
                    this.m2 = 0;
                    this.mpa = 0;
                    this.morteros = 0;
                    this.morterosCat = '';
                    this.dinteles = true;
                    this.status = '';
                    this.confirmation = true;
                    this.personUpdate = '';
                    this.updatedAt = '';
                    this.newBloc = false;
                    this.botton = 'Guardar';
                    this._changeDetectorRef.markForCheck();
                });
            }
        }
    }

    editarRegion(element) {
        this.title = 'Editar';
        this.botton = 'Actualizar';
        //let fecha = new Date(element.date).toISOString();

        this.date = new Date(element.date);
        console.log(element.date);
        this.range
            .get('start')
            .setValue(formatDate(this.date, 'yyyy-MM-dd', 'en'));
        // this.range.get('start').setValue(new Date(element.date));

        this.client = element.client;

        this.direction = element.direction;
        this.driver = element.driver;
        this.m2 = element.m2;
        this.mpa = element.mpa;
        this.morteros = element.morteros;
        this.morterosCat = element.morterosCat;
        this.dinteles = element.dinteles;
        this.status = element.status;
        this.confirmation = element.confirmation;
        this.personUpdate = element.personUpdate;
        this.updatedAt = element.updatedAt;
        this.newBloc = element.newBloc;

        this.botton = 'Guardar';
        this.id = element._id;
    }

    checkCheckBoxvalue(event) {
        this.dinteles = event.checked;
    }

    checkCheckBoxvalueBc(event) {
        this.newBloc = event.checked;
    }

    selectEventMorteros(item) {
        // console.log(item);
        this.morterosCat = item ? item : '';
        item.deselect();
    }

    selectEventDriver(item) {
        console.log(item);
        this.driver = item.tipo ? item.tipo : '';
        item.deselect();
    }

    selectEventResistencia(item) {
        // console.log(item);
        this.mpa = item.tipo ? item.tipo : '';
        item.deselect();
    }

    onChangeSearch(val: string) {
        // console.log(val);
    }

    onFocused(e) {
        // console.log(e);
    }

    selectEventStado(item) {
        this.status = item.tipo ? item.tipo : '';
        item.deselect();
    }
}
