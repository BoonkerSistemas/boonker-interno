import {ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TurneroDespachosService} from '../../../services/turneroDespachos/turneroDespachos.service';
import {AlertService} from '../../../services/alert.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DetallesTurneroComponent} from '../turnero-despachos/detalles/detallesTurnero.component';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import {saveAs} from 'file-saver';
import {HttpClient} from '@angular/common/http';

import {
    FormBuilder,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import {QuillViewComponent} from 'ngx-quill';
import {Subject} from 'rxjs';
import {items} from 'app/mock-api/apps/file-manager/data';
import {environment} from 'environments/environment';
import {ApexOptions, ChartComponent} from 'ng-apexcharts';
import {Router} from "@angular/router";

@Component({
    selector: 'app-general-view-dispatch',
    templateUrl: './general-view-dispatch.component.html',
    styleUrl: './general-view-dispatch.component.scss',
})
export class GeneralViewDispatchComponent {
    isLoading: boolean = false;
    mampuesto$: MatTableDataSource<any>;
    selectedProduct: any | null = null;
    selectedProductForm: UntypedFormGroup;

    //modal
    openModal: boolean = false;

    fechaActual = new Date().toLocaleDateString();
    semana: any = '';
    displayedColumnsMampuesto: string[] = [
        'fecha',
        'cliente',
        'destino',
        'transporte',
        'm2bloque',
        'mpa',
        'morteros',
        'dinteles',
        'confirmacion',
        'accion',
    ];
    @ViewChild('_paginator') _paginator: MatPaginator;
    @ViewChild(MatSort) _sort: MatSort;

    //Datos por dia
    arrayMamposteria: number[] = []
    arrayDintel: number[] = []
    arrayGrout: number[] = []
    arrayMortero: number[] = []
    //datos Carga
    arrayMamposteriaCarga: number[] = []
    arrayDintelCarga: number[] = []
    arrayGroutCarga: number[] = []
    arrayMorteroCarga: number[] = []

    rolLogin = '';

    timerId: any;
    fechaSincronizacion: Date;
    weekFormat: string[] = [];
    weekDaysComplete: string[] = []
    dataI: any;
    coment1: any;
    coment2: any;
    coment3: any;
    plate: any;

    m210 = 0;
    m210Total = 0;
    m210Comentarios = '';
    m210Novedades = '';
    m210Carga = 0;
    m210CargaTotal = 0;

    m212 = 0;
    m212Total = 0;
    m212Comentarios = '';
    m212Novedades = '';
    m212Carga = 0;
    m212CargaTotal = 0;

    m220 = 0;
    m220Total = 0;
    m220Comentarios = '';
    m220Novedades = '';
    m220Carga = 0;
    m220CargaTotal = 0;

    m225 = 0;
    m225Total = 0;
    m225Comentarios = '';
    m225Novedades = '';
    m225Carga = 0;
    m225CargaTotal = 0;

    m210c = 0;
    m210cTotal = 0;
    m210cComentarios = '';
    m210cNovedades = '';
    m210cCarga = 0;
    m210cCargaTotal = 0;

    m212c = 0;
    m212cTotal = 0;
    m212cComentarios = '';
    m212cNovedades = '';
    m212cCarga = 0;
    m212cCargaTotal = 0;

    m220c = 0;
    m220cTotal = 0;
    m220cComentarios = '';
    m220cNovedades = '';
    m220cCarga = 0;
    m220cCargaTotal = 0;

    m225c = 0;
    m225cTotal = 0;
    m225cComentarios = '';
    m225cNovedades = '';
    m225cCarga = 0;
    m225cCargaTotal = 0;

    n60 = 0;
    n60Total = 0;
    n60Comentarios = '';
    n60Novedades = '';
    n60Carga = 0;
    n60CargaTotal = 0;

    e60 = 0;
    e60Total = 0;
    e60Comentarios = '';
    e60Novedades = '';
    e60Carga = 0;
    e60CargaTotal = 0;

    p60 = 0;
    p60Total = 0;
    p60Comentarios = '';
    p60Novedades = '';
    p60Carga = 0;
    p60CargaTotal = 0;

    es60 = 0;
    es60Total = 0;
    es60Comentarios = '';
    es60Novedades = '';
    es60Carga = 0;
    es60CargaTotal = 0;

    plus60 = 0;
    plus60Total = 0;
    plus60Comentarios = '';
    plus60Novedades = '';
    plus60Carga = 0;
    plus60CargaTotal = 0;

    deko60 = 0;
    deko60Total = 0;
    deko60Comentarios = '';
    deko60Novedades = '';
    deko60Carga = 0;
    deko60CargaTotal = 0;

    fin60 = 0;
    fin60Total = 0;
    fin60Comentarios = '';
    fin60Novedades = '';
    fin60Carga = 0;
    fin60CargaTotal = 0;

    d1 = 0;
    d2 = 0;
    d3 = 0;
    d4 = 0;
    d5 = 0;
    d6 = 0;
    d7 = 0;
    d8 = 0;
    d9 = 0;
    d10 = 0;
    d11 = 0;
    d12 = 0;
    d13 = 0;
    d14 = 0;
    d15 = 0;
    d16 = 0;
    d17 = 0;
    d18 = 0;
    d19 = 0;
    d20 = 0;
    d21 = 0;
    d22 = 0;
    d23 = 0;
    d24 = 0;
    d25 = 0;
    d1Total = 0;
    d2Total = 0;
    d3Total = 0;
    d4Total = 0;
    d5Total = 0;
    d6Total = 0;
    d7Total = 0;
    d8Total = 0;
    d9Total = 0;
    d10Total = 0;
    d11Total = 0;
    d12Total = 0;
    d13Total = 0;
    d14Total = 0;
    d15Total = 0;
    d16Total = 0;
    d17Total = 0;
    d18Total = 0;
    d19Total = 0;
    d20Total = 0;
    d21Total = 0;
    d22Total = 0;
    d23Total = 0;
    d24Total = 0;
    d25Total = 0;

    d1Carga = 0;
    d2Carga = 0;
    d3Carga = 0;
    d4Carga = 0;
    d5Carga = 0;
    d6Carga = 0;
    d7Carga = 0;
    d8Carga = 0;
    d9Carga = 0;
    d10Carga = 0;
    d11Carga = 0;
    d12Carga = 0;
    d13Carga = 0;
    d14Carga = 0;
    d15Carga = 0;
    d16Carga = 0;
    d17Carga = 0;
    d18Carga = 0;
    d19Carga = 0;
    d20Carga = 0;
    d21Carga = 0;
    d22Carga = 0;
    d23Carga = 0;
    d24Carga = 0;
    d25Carga = 0;
    d1CargaTotal = 0;
    d2CargaTotal = 0;
    d3CargaTotal = 0;
    d4CargaTotal = 0;
    d5CargaTotal = 0;
    d6CargaTotal = 0;
    d7CargaTotal = 0;
    d8CargaTotal = 0;
    d9CargaTotal = 0;
    d10CargaTotal = 0;
    d11CargaTotal = 0;
    d12CargaTotal = 0;
    d13CargaTotal = 0;
    d14CargaTotal = 0;
    d15CargaTotal = 0;
    d16CargaTotal = 0;
    d17CargaTotal = 0;
    d18CargaTotal = 0;
    d19CargaTotal = 0;
    d20CargaTotal = 0;
    d21CargaTotal = 0;
    d22CargaTotal = 0;
    d23CargaTotal = 0;
    d24CargaTotal = 0;
    d25CargaTotal = 0;

    d1Comentarios = '';
    d2Comentarios = '';
    d3Comentarios = '';
    d4Comentarios = '';
    d5Comentarios = '';
    d6Comentarios = '';
    d7Comentarios = '';
    d8Comentarios = '';
    d9Comentarios = '';
    d10Comentarios = '';
    d11Comentarios = '';
    d12Comentarios = '';
    d13Comentarios = '';
    d14Comentarios = '';
    d15Comentarios = '';
    d16Comentarios = '';
    d17Comentarios = '';
    d18Comentarios = '';
    d19Comentarios = '';
    d20Comentarios = '';
    d21Comentarios = '';
    d22Comentarios = '';
    d23Comentarios = '';
    d24Comentarios = '';
    d25Comentarios = '';

    d1Novedades = '';
    d2Novedades = '';
    d3Novedades = '';
    d4Novedades = '';
    d5Novedades = '';
    d6Novedades = '';
    d7Novedades = '';
    d8Novedades = '';
    d9Novedades = '';
    d10Novedades = '';
    d11Novedades = '';
    d12Novedades = '';
    d13Novedades = '';
    d14Novedades = '';
    d15Novedades = '';
    d16Novedades = '';
    d17Novedades = '';
    d18Novedades = '';
    d19Novedades = '';
    d20Novedades = '';
    d21Novedades = '';
    d22Novedades = '';
    d23Novedades = '';
    d24Novedades = '';
    d25Novedades = '';

    showDiv: string | null = null;

    page: boolean = false

    sumaTotalBlock = 0
    sumaTotalGrouts = 0
    sumaTotalMorteros = 0
    sumaTotalDinteles = 0

    sumaTotalBlockCarga = 0
    sumaTotalGroutsCarga = 0
    sumaTotalMorterosCarga = 0
    sumaTotalDintelesCarga = 0

    cantidadProyectos = 0

    totalInventarioMampuesto = 0
    totalInventarioGrouts = 0
    totalInventarioMorteros = 0
    totalInventarioDinteles = 0

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tuneroDespachosService: TurneroDespachosService,
        private alertService: AlertService,
        private _formBuilder: UntypedFormBuilder,
        private _matDialog: MatDialog,
        private userService: TurneroDespachosService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.date = new Date();
        this.range = this.formBuilder.group({
            start: [
                formatDate(this.date, 'yyyy-MM-dd', 'en'),
                [Validators.required],
            ],
        });

        let usuario = JSON.parse(localStorage.getItem('user'));
        this.rolLogin = usuario.rol[0].role;
        console.log('Usuario', this.rolLogin);

        this.semanaActual();
        this.cargarData();
        //this.timerId = setInterval(() => this.cargarData(), 30000);
        this.timerId = setInterval(() => this.cargarData(), 300000);
    }

    ngOnDestroy(): void {
        clearInterval(this.timerId);
    }

    semanaActual() {
        let fecha: any = new Date();
        const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24,
            DIAS_QUE_TIENE_UNA_SEMANA = 7,
            JUEVES = 4;
        fecha = new Date(
            Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
        );
        let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
        if (diaDeLaSemana === 0) {
            diaDeLaSemana = 7;
        }
        fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
        const inicioDelAnio: any = new Date(
            Date.UTC(fecha.getUTCFullYear(), 0, 1)
        );
        const diferenciaDeFechasEnMilisegundos: any = fecha - inicioDelAnio;
        this.semana = Math.ceil(
            (diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS + 1) /
            DIAS_QUE_TIENE_UNA_SEMANA
        );
        console.log('El número de semana es: %d', this.semana);
    }

    cargarData() {
        this.getDate();
        this.fechaSincronizacion = new Date();
        this._tuneroDespachosService
            .findAllSemana1(this.semana)
            .subscribe((data) => {
                data.forEach((element) => {
                    let nuevo;
                    if (element.morterosCat) {
                        nuevo = [];
                        if (element.morterosCat) {
                            nuevo = element.morterosCat.split('*');
                        }

                        console.log('NUEVOOOS', nuevo);
                        element.morterosFormateado = [];
                        nuevo.forEach((elementNuevo: any) => {
                            if (elementNuevo !== '') {
                                element.morterosFormateado.push({
                                    name: elementNuevo,
                                });
                            }
                        });
                        element.fechaFormateada = new Date(
                            element.date
                        ).toLocaleDateString();
                    }
                });
                this.dataI = data;
                console.log(this.dataI, 'dasdasdasdasdasdasdasdasdasdasd');
                console.log('valor inicila: => ', this.m210)
                let grouts = []
                let morteros = []
                let mampuestos = []
                let dinteles = []
                let deco = []

                this.dataI.forEach((item) => {
                    grouts.push(item.grout);
                    morteros.push(item.morteros);
                    mampuestos.push(item.block);
                    dinteles.push(item.dintel);
                });

                console.log(grouts);
                this.getDayByWeek(this.dataI)
                //console.log('cantidad proyetos => ', this.dataI)
                this.cantidadProyectos = this.dataI.length
                //Suma Total despacho
                //mamposteria
                const subTotalBlock = mampuestos.map(mampuesto => mampuesto.reduce((total, value) => total + (+value.despacho), 0))
                this.sumaTotalBlock = subTotalBlock.reduce((total, value) => total + value, 0)
                // console.log('subTotal mamposteria => ', subTotalBlock)
                // console.log('total mamposteria => ', this.sumaTotalBlock)
                //grouts
                const subTotalGrouts = grouts.map(grout => grout.reduce((total, value) => total + (+value.despacho), 0))
                this.sumaTotalGrouts = subTotalGrouts.reduce((total, value) => total + value, 0)
                //morteros
                const subTotalMorteros = morteros.map(mortero => mortero.reduce((total, value) => total + (+value.despacho), 0))
                this.sumaTotalMorteros = subTotalMorteros.reduce((total, value) => total + value, 0)
                //dinteles
                const subTotalDinteles = dinteles.map(dintele => dintele.reduce((total, value) => total + (+value.despacho), 0))
                this.sumaTotalDinteles = subTotalDinteles.reduce((total, value) => total + value, 0)
                //suma total carga
                //mampuestos
                const subTotalBlockCarga = mampuestos.map(mampuesto => mampuesto.reduce((total, value) => total + (+value.carga), 0))
                console.log('suma total ', subTotalBlockCarga)
                this.sumaTotalBlockCarga = subTotalBlockCarga.reduce((total, value) => total + value, 0) || 0
                console.log('data block mpa ', this.sumaTotalBlockCarga)
                //grouts
                const subTotalGroutsCarga = grouts.map(grout => grout.reduce((total, value) => total + (+value.carga), 0))
                this.sumaTotalGroutsCarga = subTotalGroutsCarga.reduce((total, value) => total + value, 0)
                //morteros
                const subTotalMorterosCarga = morteros.map(mortero => mortero.reduce((total, value) => total + (+value.carga), 0))
                this.sumaTotalMorterosCarga = subTotalMorterosCarga.reduce((total, value) => total + value, 0)
                //dinteles
                const subTotalDintelesCarga = dinteles.map(dintele => dintele.reduce((total, value) => total + (+value.carga), 0))
                this.sumaTotalDintelesCarga = subTotalDintelesCarga.reduce((total, value) => total + value, 0)

                //total inventario
                this.totalInventarioMampuesto = this.sumaTotalBlock - this.sumaTotalBlockCarga
                this.totalInventarioGrouts = this.sumaTotalGrouts - this.sumaTotalGroutsCarga
                this.totalInventarioMorteros = this.sumaTotalMorteros - this.sumaTotalMorterosCarga
                this.totalInventarioDinteles = this.sumaTotalDinteles - this.sumaTotalDintelesCarga

                // let totalGrouts = grouts.reduce((sum, value) => sum + value.despacho, 0);
                // console.log(totalGrouts);
                // let totalMorteros = dinteles.reduce((sum, value) => (typeof value.despacho == "number" ? sum + value.despacho : sum), 0);
                // console.log(totalMorteros);
                // let totalMampuestos = mampuestos.reduce((sum, value) => (typeof value.despacho == "number" ? sum + value.despacho : sum), 0);
                // console.log(totalMampuestos);
                // let totalDinteles = dinteles.reduce((sum, value) => (typeof value.despacho == "number" ? sum + value.despacho : sum), 0);
                // console.log(totalDinteles);


                // let totalGroutsD = grouts.reduce((sum, value) => (typeof value.totalDespacho == "number" ? sum + value.totalDespacho : sum), 0);
                // console.log(totalGroutsD);
                // let totalMorterosD = dinteles.reduce((sum, value) => (typeof value.totalDespacho == "number" ? sum + value.totalDespacho : sum), 0);
                // console.log(totalMorterosD);
                // let totalMampuestosD = mampuestos.reduce((sum, value) => (typeof value.totalDespacho == "number" ? sum + value.totalDespacho : sum), 0);
                // console.log(totalMampuestosD);
                // let totalDintelesD = dinteles.reduce((sum, value) => (typeof value.totalDespacho == "number" ? sum + value.totalDespacho : sum), 0);
                // console.log(totalDintelesD);

                this.mampuesto$ = new MatTableDataSource(data);
                this.mampuesto$.paginator = this._paginator;
                this.mampuesto$.sort = this._sort;
                this._changeDetectorRef.markForCheck();
            });
    }

    addNewProyect(element: any): void {
        console.log('proyecto añadido', element)
        const dialogRef = this._matDialog.open(DetallesTurneroComponent, {
            autoFocus: false,
            data: element,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            this.cargarData();
            // console.log('The dialog was closed');
        });
    }

    editarCronograma(data: any) {
        console.log('EDITAR', data);
        this.addNewProyect(data);
    }

    eliminarCronograma(element) {
        Swal.fire({
            title: '¿Deseas eliminar este campo?',

            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero eliminar!',
            cancelButtonText: 'Cancelar!',
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(element);

                let edit = {
                    _id: element._id,
                };

                this._tuneroDespachosService.delete(edit).subscribe((data) => {
                    this.alertService.mensajeSuccess('Eliminado Correctamente');
                    this.cargarData();
                    this.ngOnInit();
                });
            }
        });
    }

    getDayByWeek(data) {
        const lunes = data.filter(item => new Date(item.date).getDay() === 1 && item)
        const martes = data.filter(item => new Date(item.date).getDay() === 2 && item)
        const miercoles = data.filter(item => new Date(item.date).getDay() === 3 && item)
        const jueves = data.filter(item => new Date(item.date).getDay() === 4 && item)
        const viernes = data.filter(item => new Date(item.date).getDay() === 5 && item)
        const sabado = data.filter(item => new Date(item.date).getDay() === 6 && item)
        const domingo = data.filter(item => new Date(item.date).getDay() === 0 && item)
        console.log('lunes ', lunes)//
        console.log('martes ', martes)//
        console.log('miercoles ', miercoles)//
        console.log('jueves ', jueves)//
        console.log('viernes ', viernes)//
        console.log('sabado ', sabado)//
        console.log('domingo ', domingo)//
        const arrayDatosDia = []

        //lunes
        //despacho
        const mamposteria = lunes.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintel = lunes.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const grout = lunes.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morteros = lunes.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalLunes = mamposteria + dintel + grout + morteros
        //carga
        const mamposteriaCarga = lunes.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelCarga = lunes.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutCarga = lunes.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosCarga = lunes.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalLunesCarga = mamposteriaCarga + dintelCarga + groutCarga + morterosCarga

        //martes
        //Despacho
        const mamposteriaMar = martes.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelMar = martes.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutMar = martes.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosMar = martes.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalMartes = mamposteriaMar + dintelMar + groutMar + morterosMar
        //Carga
        const mamposteriaMarCarga = martes.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelMarCarga = martes.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutMarCarga = martes.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosMarCarga = martes.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalMartesCarga = mamposteriaMarCarga + dintelMarCarga + groutMarCarga + morterosMarCarga

        //miercoles
        //despacho
        const mamposteriaMier = miercoles.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelMier = miercoles.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutMier = miercoles.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosMier = miercoles.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalMiercoles = mamposteriaMier + dintelMier + groutMier + morterosMier
        //carga
        const mamposteriaMierCarga = miercoles.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelMierCarga = miercoles.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutMierCarga = miercoles.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosMierCarga = miercoles.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalMiercolesCarga = mamposteriaMierCarga + dintelMierCarga + groutMierCarga + morterosMierCarga

        //jueves
        //despacho
        const mamposteriaJuev = jueves.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelJuev = jueves.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutJuev = jueves.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosJuev = jueves.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalJueves = mamposteriaJuev + dintelJuev + groutJuev + morterosJuev
        //carga
        const mamposteriaJuevCarga = jueves.map(mampostero => mampostero.block.map(item => item.Carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelJuevCarga = jueves.map(item => item.dintel.map(item => item.Carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutJuevCarga = jueves.map(item => item.grout.map(item => item.Carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosJuevCarga = jueves.map(item => item.morteros.map(item => item.Carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalJuevesCarga = mamposteriaJuevCarga + dintelJuevCarga + groutJuevCarga + morterosJuevCarga

        //viernes
        const mamposteriaVier = viernes.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelVier = viernes.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutVier = viernes.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosVier = viernes.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalViernes = mamposteriaVier + dintelVier + groutVier + morterosVier
        //carga
        const mamposteriaVierCarga = viernes.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelVierCarga = viernes.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutVierCarga = viernes.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosVierCarga = viernes.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalViernesCarga = mamposteriaVierCarga + dintelVierCarga + groutVierCarga + morterosVierCarga
        //sabado
        const mamposteriaSab = sabado.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelSab = sabado.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutSab = sabado.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosSab = sabado.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalSabado = mamposteriaSab + dintelSab + groutSab + morterosSab
        //carga
        const mamposteriaSabCarga = sabado.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelSabCarga = sabado.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutSabCarga = sabado.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosSabCarga = sabado.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalSabadoCarga = mamposteriaSabCarga + dintelSabCarga + groutSabCarga + morterosSabCarga
        //Domingo
        const mamposteriaDom = domingo.map(mampostero => mampostero.block.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const dintelDom = domingo.map(item => item.dintel.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const groutDom = domingo.map(item => item.grout.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const morterosDom = domingo.map(item => item.morteros.map(item => item.despacho).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0)
        const totalDomingo = mamposteriaDom + dintelDom + groutDom + morterosDom
        //carga
        const mamposteriaDomCarga = domingo.map(mampostero => mampostero.block.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const dintelDomCarga = domingo.map(item => item.dintel.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const groutDomCarga = domingo.map(item => item.grout.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const morterosDomCarga = domingo.map(item => item.morteros.map(item => item.carga).reduce((total, value) => total + value, 0)).reduce((total, value) => total + value, 0) || 0
        const totalDomingoCarga = mamposteriaDomCarga + dintelDomCarga + groutDomCarga + morterosDomCarga
        this.arrayMamposteria.push(mamposteria, mamposteriaMar, mamposteriaMier, mamposteriaJuev, mamposteriaVier, mamposteriaSab, mamposteriaDom)
        this.arrayDintel.push(dintel, dintelMar, dintelMier, dintelJuev, dintelVier, dintelSab, dintelDom)
        this.arrayGrout.push(grout, groutMar, groutMier, groutJuev, groutVier, groutSab, groutDom)
        this.arrayMortero.push(morteros, morterosMar, morterosMier, morterosJuev, morterosVier, morterosSab, morterosDom)

        this.arrayMamposteriaCarga.push(mamposteriaCarga || 0, mamposteriaMarCarga || 0, mamposteriaMierCarga || 0, mamposteriaJuevCarga || 0, mamposteriaVierCarga || 0, mamposteriaSabCarga || 0, mamposteriaDomCarga || 0)
        this.arrayDintelCarga.push(dintelCarga || 0, dintelMarCarga || 0, dintelMierCarga || 0, dintelJuevCarga || 0, dintelVierCarga || 0, dintelSabCarga || 0, dintelDomCarga || 0)
        this.arrayGroutCarga.push(groutCarga || 0, groutMarCarga || 0, groutMierCarga || 0, groutJuevCarga || 0, groutVierCarga || 0, groutSabCarga || 0, groutDomCarga || 0)
        this.arrayMorteroCarga.push(morterosCarga || 0, morterosMarCarga || 0, morterosMierCarga || 0, morterosJuevCarga || 0, morterosVierCarga || 0, morterosSabCarga || 0, morterosDomCarga || 0)

        arrayDatosDia.push(totalLunes || 0, totalMartes || 0, totalMiercoles || 0, totalJueves || 0, totalViernes || 0)

    }

    getDate() {
        let current = new Date();

        const week = [];
        //Controla cual sera el primer dia
        if (current.getDay() == 0) {
            current.setDate(current.getDate() - 7 + 1);
        } else {
            current.setDate(current.getDate() - current.getDay() + 1);
        }

        week.push(new Date(current)); //Agrega el primer dia al array
        current.setDate(current.getDate() + 6); //Define el septimo dia
        week.push(new Date(current)); //Agrega el ultimo dia al array

        //Aplicar formato deseado a la fecha
        week.forEach((w) => {
            moment.locale('es');
            this.weekFormat.push(moment(w).format('DD MMMM'));
        });
    }

    showModal(vista: string): void {
        this.openModal = !this.openModal;
        this.showDiv = vista;
        console.log('caja vista', vista);
    }

    servicioPreGuia() {
        console.log(this.selectedProduct._id)
        this.http.post(environment.url + 'board-canva/pre-guia/' + this.selectedProduct._id, {}, {responseType: 'blob'}).subscribe((data: Blob) => {
            console.log(data)
            const blob = new Blob([data], {type: 'application/pdf'});
            saveAs(blob, 'Guía.pdf');
        })
    }

    servicioDespacho() {
        this.router.navigate(['turnero-despachos/despachos-board/'+this.selectedProduct._id]);
    }

    servicioGuia() {
        this.http
            .get(environment.url + 'board-canva/guia' + this.selectedProduct._id, {responseType: 'blob'})
            .subscribe((data: Blob) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                saveAs(blob, 'guia.pdf');
            });
    }

    servicioFactura() {
        this.http
            .get(environment.url + 'board-canva/factura', {
                responseType: 'blob',
            })
            .subscribe((data: Blob) => {
                console.log('descargando pdf....', data);
                const blob = new Blob([data], {type: 'application/pdf'});
                saveAs(blob, 'pre-guia.pdf');
            });
    }

    detalleDespacho() {
        this.page = !this.page
    }

    toggleDetails(productId: string): void {
        console.log(
            this.selectedProduct && this.selectedProduct._id === productId
        );
        // If the product is already selected...
        if (this.selectedProduct && this.selectedProduct._id === productId) {
            // Close the details
            this.closeDetails();
            return;
        }

        this._tuneroDespachosService.findOne(productId).subscribe((product) => {
            // Set the selected product
            this.edit = true;
            this.editarRegion(product);
            this.selectedProduct = product;
            console.log('data completa => ', this.selectedProduct)
            console.log("valor recuperado => ", this.selectedProduct.block.length)
            //sin visel
            if (this.selectedProduct.block.length) {
                this.m210 = this.selectedProduct.block[0].despacho || 0
                this.m212 = this.selectedProduct.block[1].despacho || 0
                this.m220 = this.selectedProduct.block[2].despacho || 0
                this.m225 = this.selectedProduct.block[3].despacho || 0
                this.m210Total = this.selectedProduct.block[0].totalDespachar || 0
                this.m212Total = this.selectedProduct.block[1].totalDespachar || 0
                this.m220Total = this.selectedProduct.block[2].totalDespachar || 0
                this.m225Total = this.selectedProduct.block[3].totalDespachar || 0
                //con visel
                this.m210c = this.selectedProduct.block[4].despacho || 0
                this.m212c = this.selectedProduct.block[5].despacho || 0
                this.m220c = this.selectedProduct.block[6].despacho || 0
                this.m225c = this.selectedProduct.block[7].despacho || 0
                this.m210cTotal = this.selectedProduct.block[4].totalDespachar || 0
                this.m212cTotal = this.selectedProduct.block[5].totalDespachar || 0
                this.m220cTotal = this.selectedProduct.block[6].totalDespachar || 0
                this.m225cTotal = this.selectedProduct.block[7].totalDespachar || 0
                //Grots
                this.n60 = this.selectedProduct.grout[0].despacho || 0
                this.e60 = this.selectedProduct.grout[1].despacho || 0
                this.p60 = this.selectedProduct.grout[2].despacho || 0
                this.n60Total = this.selectedProduct.grout[0].totalDespachar || 0
                this.e60Total = this.selectedProduct.grout[1].totalDespachar || 0
                this.p60Total = this.selectedProduct.grout[2].totalDespachar || 0
                //morteros
                this.es60 = this.selectedProduct.morteros[0].despacho || 0
                this.plus60 = this.selectedProduct.morteros[1].despacho || 0
                this.es60Total = this.selectedProduct.morteros[0].totalDespachar || 0
                this.plus60Total = this.selectedProduct.morteros[1].totalDespachar || 0
                //recubrimientos
                // this.deko60
                // this.fin60
                //Dinteles
                this.d1 = this.selectedProduct.dintel[0].despacho || 0
                this.d2 = this.selectedProduct.dintel[1].despacho || 0
                this.d3 = this.selectedProduct.dintel[2].despacho || 0
                this.d4 = this.selectedProduct.dintel[3].despacho || 0
                this.d5 = this.selectedProduct.dintel[4].despacho || 0
                this.d6 = this.selectedProduct.dintel[5].despacho || 0
                this.d7 = this.selectedProduct.dintel[6].despacho || 0
                this.d8 = this.selectedProduct.dintel[7].despacho || 0
                this.d9 = this.selectedProduct.dintel[8].despacho || 0
                this.d10 = this.selectedProduct.dintel[9].despacho || 0
                this.d11 = this.selectedProduct.dintel[10].despacho || 0
                this.d12 = this.selectedProduct.dintel[11].despacho || 0
                this.d13 = this.selectedProduct.dintel[12].despacho || 0
                this.d14 = this.selectedProduct.dintel[13].despacho || 0
                this.d15 = this.selectedProduct.dintel[14].despacho || 0
                this.d16 = this.selectedProduct.dintel[15].despacho || 0
                this.d17 = this.selectedProduct.dintel[16].despacho || 0
                this.d18 = this.selectedProduct.dintel[17].despacho || 0
                this.d19 = this.selectedProduct.dintel[18].despacho || 0
                this.d20 = this.selectedProduct.dintel[19].despacho || 0
                this.d21 = this.selectedProduct.dintel[20].despacho || 0
                this.d22 = this.selectedProduct.dintel[21].despacho || 0
                this.d23 = this.selectedProduct.dintel[22].despacho || 0
                this.d24 = this.selectedProduct.dintel[23].despacho || 0
                this.d25 = this.selectedProduct.dintel[24].despacho || 0
                this.d1Total = this.selectedProduct.dintel[0].totalDespachar || 0
                this.d2Total = this.selectedProduct.dintel[1].totalDespachar || 0
                this.d3Total = this.selectedProduct.dintel[2].totalDespachar || 0
                this.d4Total = this.selectedProduct.dintel[3].totalDespachar || 0
                this.d5Total = this.selectedProduct.dintel[4].totalDespachar || 0
                this.d6Total = this.selectedProduct.dintel[5].totalDespachar || 0
                this.d7Total = this.selectedProduct.dintel[6].totalDespachar || 0
                this.d8Total = this.selectedProduct.dintel[7].totalDespachar || 0
                this.d9Total = this.selectedProduct.dintel[8].totalDespachar || 0
                this.d10Total = this.selectedProduct.dintel[9].totalDespachar || 0
                this.d11Total = this.selectedProduct.dintel[10].totalDespachar || 0
                this.d12Total = this.selectedProduct.dintel[11].totalDespachar || 0
                this.d13Total = this.selectedProduct.dintel[12].totalDespachar || 0
                this.d14Total = this.selectedProduct.dintel[13].totalDespachar || 0
                this.d15Total = this.selectedProduct.dintel[14].totalDespachar || 0
                this.d16Total = this.selectedProduct.dintel[15].totalDespachar || 0
                this.d17Total = this.selectedProduct.dintel[16].totalDespachar || 0
                this.d18Total = this.selectedProduct.dintel[17].totalDespachar || 0
                this.d19Total = this.selectedProduct.dintel[18].totalDespachar || 0
                this.d20Total = this.selectedProduct.dintel[19].totalDespachar || 0
                this.d21Total = this.selectedProduct.dintel[20].totalDespachar || 0
                this.d22Total = this.selectedProduct.dintel[21].totalDespachar || 0
                this.d23Total = this.selectedProduct.dintel[22].totalDespachar || 0
                this.d24Total = this.selectedProduct.dintel[23].totalDespachar || 0
                this.d25Total = this.selectedProduct.dintel[24].totalDespachar || 0

                //Carga
                //sin visel
                this.m210Carga = this.selectedProduct.block[0].carga || 0
                this.m212Carga = this.selectedProduct.block[1].carga || 0
                this.m220Carga = this.selectedProduct.block[2].carga || 0
                this.m225Carga = this.selectedProduct.block[3].carga || 0
                this.m210CargaTotal = this.selectedProduct.block[0].totalDespacho || 0
                this.m212CargaTotal = this.selectedProduct.block[1].totalDespacho || 0
                this.m220CargaTotal = this.selectedProduct.block[2].totalDespacho || 0
                this.m225CargaTotal = this.selectedProduct.block[3].totalDespacho || 0
                //con visel
                this.m210cCarga = this.selectedProduct.block[4].carga || 0
                this.m212cCarga = this.selectedProduct.block[5].carga || 0
                this.m220cCarga = this.selectedProduct.block[6].carga || 0
                this.m225cCarga = this.selectedProduct.block[7].carga || 0
                this.m210cCargaTotal = this.selectedProduct.block[4].totalDespacho || 0
                this.m212cCargaTotal = this.selectedProduct.block[5].totalDespacho || 0
                this.m220cCargaTotal = this.selectedProduct.block[6].totalDespacho || 0
                this.m225cCargaTotal = this.selectedProduct.block[7].totalDespacho || 0
                //Grots
                this.n60Carga = this.selectedProduct.grout[0].carga || 0
                this.e60Carga = this.selectedProduct.grout[1].carga || 0
                this.p60Carga = this.selectedProduct.grout[2].carga || 0
                this.n60CargaTotal = this.selectedProduct.grout[0].totalDespacho || 0
                this.e60CargaTotal = this.selectedProduct.grout[1].totalDespacho || 0
                this.p60CargaTotal = this.selectedProduct.grout[2].totalDespacho || 0
                //morteros
                this.es60Carga = this.selectedProduct.morteros[0].carga || 0
                this.plus60Carga = this.selectedProduct.morteros[1].carga || 0
                this.es60CargaTotal = this.selectedProduct.morteros[0].totalDespacho || 0
                this.plus60CargaTotal = this.selectedProduct.morteros[1].totalDespacho || 0
                //recubrimientos
                // this.deko60
                // this.fin60
                //Dinteles
                this.d1Carga = this.selectedProduct.dintel[0].carga || 0
                this.d2Carga = this.selectedProduct.dintel[1].carga || 0
                this.d3Carga = this.selectedProduct.dintel[2].carga || 0
                this.d4Carga = this.selectedProduct.dintel[3].carga || 0
                this.d5Carga = this.selectedProduct.dintel[4].carga || 0
                this.d6Carga = this.selectedProduct.dintel[5].carga || 0
                this.d7Carga = this.selectedProduct.dintel[6].carga || 0
                this.d8Carga = this.selectedProduct.dintel[7].carga || 0
                this.d9Carga = this.selectedProduct.dintel[8].carga || 0
                this.d10Carga = this.selectedProduct.dintel[9].carga || 0
                this.d11Carga = this.selectedProduct.dintel[10].carga || 0
                this.d12Carga = this.selectedProduct.dintel[11].carga || 0
                this.d13Carga = this.selectedProduct.dintel[12].carga || 0
                this.d14Carga = this.selectedProduct.dintel[13].carga || 0
                this.d15Carga = this.selectedProduct.dintel[14].carga || 0
                this.d16Carga = this.selectedProduct.dintel[15].carga || 0
                this.d17Carga = this.selectedProduct.dintel[16].carga || 0
                this.d18Carga = this.selectedProduct.dintel[17].carga || 0
                this.d19Carga = this.selectedProduct.dintel[18].carga || 0
                this.d20Carga = this.selectedProduct.dintel[19].carga || 0
                this.d21Carga = this.selectedProduct.dintel[20].carga || 0
                this.d22Carga = this.selectedProduct.dintel[21].carga || 0
                this.d23Carga = this.selectedProduct.dintel[22].carga || 0
                this.d24Carga = this.selectedProduct.dintel[23].carga || 0
                this.d25Carga = this.selectedProduct.dintel[24].carga || 0
                this.d1CargaTotal = this.selectedProduct.dintel[0].totalDespacho || 0
                this.d2CargaTotal = this.selectedProduct.dintel[1].totalDespacho || 0
                this.d3CargaTotal = this.selectedProduct.dintel[2].totalDespacho || 0
                this.d4CargaTotal = this.selectedProduct.dintel[3].totalDespacho || 0
                this.d5CargaTotal = this.selectedProduct.dintel[4].totalDespacho || 0
                this.d6CargaTotal = this.selectedProduct.dintel[5].totalDespacho || 0
                this.d7CargaTotal = this.selectedProduct.dintel[6].totalDespacho || 0
                this.d8CargaTotal = this.selectedProduct.dintel[7].totalDespacho || 0
                this.d9CargaTotal = this.selectedProduct.dintel[8].totalDespacho || 0
                this.d10CargaTotal = this.selectedProduct.dintel[9].totalDespacho || 0
                this.d11CargaTotal = this.selectedProduct.dintel[10].totalDespacho || 0
                this.d12CargaTotal = this.selectedProduct.dintel[11].totalDespacho || 0
                this.d13CargaTotal = this.selectedProduct.dintel[12].totalDespacho || 0
                this.d14CargaTotal = this.selectedProduct.dintel[13].totalDespacho || 0
                this.d15CargaTotal = this.selectedProduct.dintel[14].totalDespacho || 0
                this.d16CargaTotal = this.selectedProduct.dintel[15].totalDespacho || 0
                this.d17CargaTotal = this.selectedProduct.dintel[16].totalDespacho || 0
                this.d18CargaTotal = this.selectedProduct.dintel[17].totalDespacho || 0
                this.d19CargaTotal = this.selectedProduct.dintel[18].totalDespacho || 0
                this.d20CargaTotal = this.selectedProduct.dintel[19].totalDespacho || 0
                this.d21CargaTotal = this.selectedProduct.dintel[20].totalDespacho || 0
                this.d22CargaTotal = this.selectedProduct.dintel[21].totalDespacho || 0
                this.d23CargaTotal = this.selectedProduct.dintel[22].totalDespacho || 0
                this.d24CargaTotal = this.selectedProduct.dintel[23].totalDespacho || 0
                this.d25CargaTotal = this.selectedProduct.dintel[24].totalDespacho || 0

                //novedades y comentarios
                //sin visel
                this.m210Comentarios = this.selectedProduct.block[0].comentarios || ''
                this.m210Novedades = this.selectedProduct.block[0].novedades || ''
                this.m212Comentarios = this.selectedProduct.block[1].comentarios || ''
                this.m212Novedades = this.selectedProduct.block[1].novedades || ''
                this.m220Comentarios = this.selectedProduct.block[2].comentarios || ''
                this.m220Novedades = this.selectedProduct.block[2].novedades || ''
                this.m225Comentarios = this.selectedProduct.block[3].comentarios || ''
                this.m225Novedades = this.selectedProduct.block[3].novedades || ''
                //con visel
                this.m210cComentarios = this.selectedProduct.block[4].comentarios || ''
                this.m210cNovedades = this.selectedProduct.block[4].novedades || ''
                this.m212cComentarios = this.selectedProduct.block[5].comentarios || ''
                this.m212cNovedades = this.selectedProduct.block[5].novedades || ''
                this.m220cComentarios = this.selectedProduct.block[6].comentarios || ''
                this.m220cNovedades = this.selectedProduct.block[6].novedades || ''
                this.m225cComentarios = this.selectedProduct.block[7].comentarios || ''
                this.m225cNovedades = this.selectedProduct.block[7].novedades || ''
                //grouts
                this.n60Comentarios = this.selectedProduct.grout[0].comentarios || ''
                this.n60Novedades = this.selectedProduct.grout[0].novedades || ''
                this.e60Comentarios = this.selectedProduct.grout[1].comentarios || ''
                this.e60Novedades = this.selectedProduct.grout[1].novedades || ''
                this.p60Comentarios = this.selectedProduct.grout[2].comentarios || ''
                this.p60Novedades = this.selectedProduct.grout[2].novedades || ''
                //morteros
                this.es60Comentarios = this.selectedProduct.morteros[0].comentarios || ''
                this.es60Novedades = this.selectedProduct.morteros[0].novedades || ''
                this.plus60Comentarios = this.selectedProduct.morteros[1].comentarios || ''
                this.plus60Novedades = this.selectedProduct.morteros[1].novedades || ''
                //dinteles
                this.d1Comentarios = this.selectedProduct.dintel[0].comentarios || ''
                this.d1Novedades = this.selectedProduct.dintel[0].novedades || ''
                this.d2Comentarios = this.selectedProduct.dintel[1].comentarios || ''
                this.d2Novedades = this.selectedProduct.dintel[1].novedades || ''
                this.d3Comentarios = this.selectedProduct.dintel[2].comentarios || ''
                this.d3Novedades = this.selectedProduct.dintel[2].novedades || ''
                this.d4Comentarios = this.selectedProduct.dintel[3].comentarios || ''
                this.d4Novedades = this.selectedProduct.dintel[3].novedades || ''
                this.d5Comentarios = this.selectedProduct.dintel[4].comentarios || ''
                this.d5Novedades = this.selectedProduct.dintel[4].novedades || ''
                this.d6Comentarios = this.selectedProduct.dintel[5].comentarios || ''
                this.d6Novedades = this.selectedProduct.dintel[5].novedades || ''
                this.d7Comentarios = this.selectedProduct.dintel[6].comentarios || ''
                this.d7Novedades = this.selectedProduct.dintel[6].novedades || ''
                this.d8Comentarios = this.selectedProduct.dintel[7].comentarios || ''
                this.d8Novedades = this.selectedProduct.dintel[7].novedades || ''
                this.d9Comentarios = this.selectedProduct.dintel[8].comentarios || ''
                this.d9Novedades = this.selectedProduct.dintel[8].novedades || ''
                this.d10Comentarios = this.selectedProduct.dintel[9].comentarios || ''
                this.d10Novedades = this.selectedProduct.dintel[9].novedades || ''
                this.d11Comentarios = this.selectedProduct.dintel[10].comentarios || ''
                this.d11Novedades = this.selectedProduct.dintel[10].novedades || ''
                this.d12Comentarios = this.selectedProduct.dintel[11].comentarios || ''
                this.d12Novedades = this.selectedProduct.dintel[11].novedades || ''
                this.d13Comentarios = this.selectedProduct.dintel[12].comentarios || ''
                this.d13Novedades = this.selectedProduct.dintel[12].novedades || ''
                this.d14Comentarios = this.selectedProduct.dintel[13].comentarios || ''
                this.d14Novedades = this.selectedProduct.dintel[13].novedades || ''
                this.d15Comentarios = this.selectedProduct.dintel[14].comentarios || ''
                this.d15Novedades = this.selectedProduct.dintel[14].novedades || ''
                this.d16Comentarios = this.selectedProduct.dintel[15].comentarios || ''
                this.d16Novedades = this.selectedProduct.dintel[15].novedades || ''
                this.d17Comentarios = this.selectedProduct.dintel[16].comentarios || ''
                this.d17Novedades = this.selectedProduct.dintel[16].novedades || ''
                this.d18Comentarios = this.selectedProduct.dintel[17].comentarios || ''
                this.d18Novedades = this.selectedProduct.dintel[17].novedades || ''
                this.d19Comentarios = this.selectedProduct.dintel[18].comentarios || ''
                this.d19Novedades = this.selectedProduct.dintel[18].novedades || ''
                this.d20Comentarios = this.selectedProduct.dintel[19].comentarios || ''
                this.d20Novedades = this.selectedProduct.dintel[19].novedades || ''
                this.d21Comentarios = this.selectedProduct.dintel[20].comentarios || ''
                this.d21Novedades = this.selectedProduct.dintel[20].novedades || ''
                this.d22Comentarios = this.selectedProduct.dintel[21].comentarios || ''
                this.d22Novedades = this.selectedProduct.dintel[21].novedades || ''
                this.d23Comentarios = this.selectedProduct.dintel[22].comentarios || ''
                this.d23Novedades = this.selectedProduct.dintel[22].novedades || ''
                this.d24Comentarios = this.selectedProduct.dintel[23].comentarios || ''
                this.d24Novedades = this.selectedProduct.dintel[23].novedades || ''
                this.d25Comentarios = this.selectedProduct.dintel[24].comentarios || ''
                this.d25Novedades = this.selectedProduct.dintel[24].novedades || ''
            } else {
                this.m210 = 0
                this.m212 = 0
                this.m220 = 0
                this.m225 = 0
                this.m210Total = 0
                this.m212Total = 0
                this.m220Total = 0
                this.m225Total = 0
                //con visel
                this.m210c = 0
                this.m212c = 0
                this.m220c = 0
                this.m225c = 0
                this.m210cTotal = 0
                this.m212cTotal = 0
                this.m220cTotal = 0
                this.m225cTotal = 0
                //Grots
                this.n60 = 0
                this.e60 = 0
                this.p60 = 0
                this.n60Total = 0
                this.e60Total = 0
                this.p60Total = 0
                //morteros
                this.es60 = 0
                this.plus60 = 0
                this.es60Total = 0
                this.plus60Total = 0
                //recubrimientos
                // this.deko60
                // this.fin60
                //Dinteles
                this.d1 = 0
                this.d2 = 0
                this.d3 = 0
                this.d4 = 0
                this.d5 = 0
                this.d6 = 0
                this.d7 = 0
                this.d8 = 0
                this.d9 = 0
                this.d10 = 0
                this.d11 = 0
                this.d12 = 0
                this.d13 = 0
                this.d14 = 0
                this.d15 = 0
                this.d16 = 0
                this.d17 = 0
                this.d18 = 0
                this.d19 = 0
                this.d20 = 0
                this.d21 = 0
                this.d22 = 0
                this.d23 = 0
                this.d24 = 0
                this.d25 = 0
                this.d1Total = 0
                this.d2Total = 0
                this.d3Total = 0
                this.d4Total = 0
                this.d5Total = 0
                this.d6Total = 0
                this.d7Total = 0
                this.d8Total = 0
                this.d9Total = 0
                this.d10Total = 0
                this.d11Total = 0
                this.d12Total = 0
                this.d13Total = 0
                this.d14Total = 0
                this.d15Total = 0
                this.d16Total = 0
                this.d17Total = 0
                this.d18Total = 0
                this.d19Total = 0
                this.d20Total = 0
                this.d21Total = 0
                this.d22Total = 0
                this.d23Total = 0
                this.d24Total = 0
                this.d25Total = 0

                //Carga
                //sin visel
                this.m210Carga = 0
                this.m212Carga = 0
                this.m220Carga = 0
                this.m225Carga = 0
                this.m210CargaTotal = 0
                this.m212CargaTotal = 0
                this.m220CargaTotal = 0
                this.m225CargaTotal = 0
                //con visel
                this.m210cCarga = 0
                this.m212cCarga = 0
                this.m220cCarga = 0
                this.m225cCarga = 0
                this.m210cCargaTotal = 0
                this.m212cCargaTotal = 0
                this.m220cCargaTotal = 0
                this.m225cCargaTotal = 0
                //Grots
                this.n60Carga = 0
                this.e60Carga = 0
                this.p60Carga = 0
                this.n60CargaTotal = 0
                this.e60CargaTotal = 0
                this.p60CargaTotal = 0
                //morteros
                this.es60Carga = 0
                this.plus60Carga = 0
                this.es60CargaTotal = 0
                this.plus60CargaTotal = 0
                //recubrimientos
                // this.deko60
                // this.fin60
                //Dinteles
                this.d1Carga = 0
                this.d2Carga = 0
                this.d3Carga = 0
                this.d4Carga = 0
                this.d5Carga = 0
                this.d6Carga = 0
                this.d7Carga = 0
                this.d8Carga = 0
                this.d9Carga = 0
                this.d10Carga = 0
                this.d11Carga = 0
                this.d12Carga = 0
                this.d13Carga = 0
                this.d14Carga = 0
                this.d15Carga = 0
                this.d16Carga = 0
                this.d17Carga = 0
                this.d18Carga = 0
                this.d19Carga = 0
                this.d20Carga = 0
                this.d21Carga = 0
                this.d22Carga = 0
                this.d23Carga = 0
                this.d24Carga = 0
                this.d25Carga = 0
                this.d1CargaTotal = 0
                this.d2CargaTotal = 0
                this.d3CargaTotal = 0
                this.d4CargaTotal = 0
                this.d5CargaTotal = 0
                this.d6CargaTotal = 0
                this.d7CargaTotal = 0
                this.d8CargaTotal = 0
                this.d9CargaTotal = 0
                this.d10CargaTotal = 0
                this.d11CargaTotal = 0
                this.d12CargaTotal = 0
                this.d13CargaTotal = 0
                this.d14CargaTotal = 0
                this.d15CargaTotal = 0
                this.d16CargaTotal = 0
                this.d17CargaTotal = 0
                this.d18CargaTotal = 0
                this.d19CargaTotal = 0
                this.d20CargaTotal = 0
                this.d21CargaTotal = 0
                this.d22CargaTotal = 0
                this.d23CargaTotal = 0
                this.d24CargaTotal = 0
                this.d25CargaTotal = 0

                //novedades y comentarios
                //sin visel
                this.m210Comentarios = ''
                this.m210Novedades = ''
                this.m212Comentarios = ''
                this.m212Novedades = ''
                this.m220Comentarios = ''
                this.m220Novedades = ''
                this.m225Comentarios = ''
                this.m225Novedades = ''
                //con visel
                this.m210cComentarios = ''
                this.m210cNovedades = ''
                this.m212cComentarios = ''
                this.m212cNovedades = ''
                this.m220cComentarios = ''
                this.m220cNovedades = ''
                this.m225cComentarios = ''
                this.m225cNovedades = ''
                //grouts
                this.n60Comentarios = ''
                this.n60Novedades = ''
                this.e60Comentarios = ''
                this.e60Novedades = ''
                this.p60Comentarios = ''
                this.p60Novedades = ''
                //morteros
                this.es60Comentarios = ''
                this.es60Novedades = ''
                this.plus60Comentarios = ''
                this.plus60Novedades = ''
                //dinteles
                this.d1Comentarios = ''
                this.d1Novedades = ''
                this.d2Comentarios = ''
                this.d2Novedades = ''
                this.d3Comentarios = ''
                this.d3Novedades = ''
                this.d4Comentarios = ''
                this.d4Novedades = ''
                this.d5Comentarios = ''
                this.d5Novedades = ''
                this.d6Comentarios = ''
                this.d6Novedades = ''
                this.d7Comentarios = ''
                this.d7Novedades = ''
                this.d8Comentarios = ''
                this.d8Novedades = ''
                this.d9Comentarios = ''
                this.d9Novedades = ''
                this.d10Comentarios = ''
                this.d10Novedades = ''
                this.d11Comentarios = ''
                this.d11Novedades = ''
                this.d12Comentarios = ''
                this.d12Novedades = ''
                this.d13Comentarios = ''
                this.d13Novedades = ''
                this.d14Comentarios = ''
                this.d14Novedades = ''
                this.d15Comentarios = ''
                this.d15Novedades = ''
                this.d16Comentarios = ''
                this.d16Novedades = ''
                this.d17Comentarios = ''
                this.d17Novedades = ''
                this.d18Comentarios = ''
                this.d18Novedades = ''
                this.d19Comentarios = ''
                this.d19Novedades = ''
                this.d20Comentarios = ''
                this.d20Novedades = ''
                this.d21Comentarios = ''
                this.d21Novedades = ''
                this.d22Comentarios = ''
                this.d22Novedades = ''
                this.d23Comentarios = ''
                this.d23Novedades = ''
                this.d24Comentarios = ''
                this.d24Novedades = ''
                this.d25Comentarios = ''
                this.d25Novedades = ''
            }
            // Fill the form
            //this.selectedProductForm.patchValue(product);

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedProduct = null;
    }

    estado: boolean = false;
    keyword = 'tipo';
    vehiculo: any = [
        {tipo: 'Camioneta'},
        {tipo: 'Camion'},
        {tipo: 'Mula'},
        {tipo: 'Trailer'},
    ];

    estados: any = [
        {tipo: 'Preliminar'},
        {tipo: 'Confirmado'},
        {tipo: 'Anulado'},
        {tipo: 'Despachado'},
        {tipo: 'Reprogramado'},
    ];

    keyword1 = 'tipo';
    mpab: any = [{tipo: '12'}, {tipo: '20'}];

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
    preview = '';
    id: any;
    rol: any[];
    lastName: any;
    phone: any;
    newBloc: boolean = false;
    ruc: any;
    currentFile?: File;
    morteros: any;
    range: FormGroup;

    onNoClick(): void {
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    guardarRegion() {
        let insert = [
            {
                date: '',
                week: 0,
                plate: '',
                block: [
                    {
                        detalle: '10 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m210,
                        totalDespachar: this.m210Total,
                        carga: this.m210Carga,
                        totalDespacho: this.m210CargaTotal,
                        novedades: this.m210Novedades,
                        comentarios: this.m210Comentarios,
                    },
                    {
                        detalle: '12 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m212,
                        totalDespachar: this.m212Total,
                        carga: this.m212Carga,
                        totalDespacho: this.m212CargaTotal,
                        novedades: this.m212Novedades,
                        comentarios: this.m212Comentarios,
                    },
                    {
                        detalle: '20 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m220,
                        totalDespachar: this.m220Total,
                        carga: this.m220Carga,
                        totalDespacho: this.m220CargaTotal,
                        novedades: this.m220Novedades,
                        comentarios: this.m220Comentarios,
                    },
                    {
                        detalle: '25 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m225,
                        totalDespachar: this.m225Total,
                        carga: this.m225Carga,
                        totalDespacho: this.m225CargaTotal,
                        novedades: this.m225Novedades,
                        comentarios: this.m225Comentarios,
                    },

                    {
                        detalle: '10 Con Bisel',
                        m2: '8.09',
                        despacho: this.m210c,
                        totalDespachar: this.m210cTotal,
                        carga: this.m210cCarga,
                        totalDespacho: this.m210cCargaTotal,
                        novedades: this.m210Novedades,
                        comentarios: this.m210Comentarios,
                    },
                    {
                        detalle: '12 Con Bisel',
                        m2: '8.09',
                        despacho: this.m212c,
                        totalDespachar: this.m212cTotal,
                        carga: this.m212cCarga,
                        totalDespacho: this.m212cCargaTotal,
                        novedades: this.m212Novedades,
                        comentarios: this.m212cComentarios,
                    },
                    {
                        detalle: '20 Con Bisel',
                        m2: '8.09',
                        despacho: this.m220c,
                        totalDespachar: this.m220cTotal,
                        carga: this.m220Carga,
                        totalDespacho: this.m220CargaTotal,
                        novedades: this.m220cNovedades,
                        comentarios: this.m220cComentarios,
                    },
                    {
                        detalle: '25 Con Bisel',
                        m2: '8.09',
                        despacho: this.m225c,
                        totalDespachar: this.m225cTotal,
                        carga: this.m225Carga,
                        totalDespacho: this.m225CargaTotal,
                        novedades: this.m225cNovedades,
                        comentarios: this.m225cComentarios,
                    },
                ],
                grout: [
                    {
                        detalle: 'Nivelación',
                        m2: '60',
                        despacho: this.n60,
                        totalDespachar: this.n60Total,
                        carga: this.n60Carga,
                        totalDespacho: this.n60CargaTotal,
                        novedades: this.n60Novedades,
                        comentarios: this.n60Comentarios,
                    },
                    {
                        detalle: 'Estandar',
                        m2: '60',
                        despacho: this.e60,
                        totalDespachar: this.e60Total,
                        carga: this.e60Carga,
                        totalDespacho: this.e60CargaTotal,
                        novedades: this.e60Novedades,
                        comentarios: this.e60Comentarios,
                    },
                    {
                        detalle: 'Plus',
                        m2: '60',
                        despacho: this.p60,
                        totalDespachar: this.p60Total,
                        carga: this.p60Carga,
                        totalDespacho: this.p60CargaTotal,
                        novedades: this.p60Novedades,
                        comentarios: this.p60Comentarios,
                    },
                ],
                morteros: [
                    {
                        detalle: 'Estandar',
                        m2: '60',
                        despacho: this.es60,
                        totalDespachar: this.es60Total,
                        carga: this.es60Carga,
                        totalDespacho: this.es60CargaTotal,
                        novedades: this.es60Novedades,
                        comentarios: this.es60Comentarios,
                    },
                    {
                        detalle: 'Plus',
                        m2: '60',
                        despacho: this.plus60,
                        totalDespachar: this.plus60Total,
                        carga: this.plus60Carga,
                        totalDespacho: this.plus60CargaTotal,
                        novedades: this.plus60Novedades,
                        comentarios: this.plus60Comentarios,
                    },
                ],
                recubrimientos: [
                    {
                        detalle: 'Deko',
                        m2: '60',
                        despacho: this.deko60,
                        totalDespachar: this.deko60Total,
                        carga: this.deko60Carga,
                        totalDespacho: this.deko60CargaTotal,
                        novedades: this.deko60Novedades,
                        comentarios: this.deko60Comentarios,
                    },
                    {
                        detalle: 'Finish',
                        m2: '60',
                        despacho: this.fin60,
                        totalDespachar: this.fin60Total,
                        carga: this.fin60Carga,
                        totalDespacho: this.fin60CargaTotal,
                        novedades: this.fin60Novedades,
                        comentarios: this.fin60Comentarios,
                    },
                ],
                dintel: [
                    {
                        detalle: '0.5',
                        m2: '1',
                        despacho: this.d1,
                        totalDespachar: this.d1Total,
                        carga: this.d1Carga,
                        totalDespacho: this.d1CargaTotal,
                        novedades: this.d10Novedades,
                        comentarios: this.d1Comentarios,
                    },
                    {
                        detalle: '0.625',
                        m2: '1',
                        despacho: this.d2,
                        totalDespachar: this.d2Total,
                        carga: this.d2Carga,
                        totalDespacho: this.d2CargaTotal,
                        novedades: this.d2Novedades,
                        comentarios: this.d2Comentarios,
                    },
                    {
                        detalle: '0.75',
                        m2: '1',
                        despacho: this.d3,
                        totalDespachar: this.d3Total,
                        carga: this.d3Carga,
                        totalDespacho: this.d3CargaTotal,
                        novedades: this.d3Novedades,
                        comentarios: this.d3Comentarios,
                    },
                    {
                        detalle: '0.875',
                        m2: '1',
                        despacho: this.d4,
                        totalDespachar: this.d4Total,
                        carga: this.d4Carga,
                        totalDespacho: this.d4CargaTotal,
                        novedades: this.d4Novedades,
                        comentarios: this.d4Comentarios,
                    },
                    {
                        detalle: '1.00',
                        m2: '1',
                        despacho: this.d5,
                        totalDespachar: this.d5Total,
                        carga: this.d5Carga,
                        totalDespacho: this.d5CargaTotal,
                        novedades: this.d5Novedades,
                        comentarios: this.d5Comentarios,
                    },
                    {
                        detalle: '1.125',
                        m2: '1',
                        despacho: this.d6,
                        totalDespachar: this.d6Total,
                        carga: this.d6Carga,
                        totalDespacho: this.d6CargaTotal,
                        novedades: this.d6Novedades,
                        comentarios: this.d6Comentarios,
                    },
                    {
                        detalle: '1.25',
                        m2: '1',
                        despacho: this.d7,
                        totalDespachar: this.d7Total,
                        carga: this.d7Carga,
                        totalDespacho: this.d7CargaTotal,
                        novedades: this.d7Novedades,
                        comentarios: this.d7Comentarios,
                    },
                    {
                        detalle: '1.375',
                        m2: '1',
                        despacho: this.d8,
                        totalDespachar: this.d8Total,
                        carga: this.d8Carga,
                        totalDespacho: this.d8CargaTotal,
                        novedades: this.d8Novedades,
                        comentarios: this.d8Comentarios,
                    },
                    {
                        detalle: '1.50',
                        m2: '1',
                        despacho: this.d9,
                        totalDespachar: this.d9Total,
                        carga: this.d9Carga,
                        totalDespacho: this.d9CargaTotal,
                        novedades: this.d9Novedades,
                        comentarios: this.d9Comentarios,
                    },
                    {
                        detalle: '1.625',
                        m2: '1',
                        despacho: this.d10,
                        totalDespachar: this.d10Total,
                        carga: this.d10Carga,
                        totalDespacho: this.d10CargaTotal,
                        novedades: this.d10Novedades,
                        comentarios: this.d10Comentarios,
                    },
                    {
                        detalle: '1.75',
                        m2: '1',
                        despacho: this.d11,
                        totalDespachar: this.d11Total,
                        carga: this.d11Carga,
                        totalDespacho: this.d11CargaTotal,
                        novedades: this.d11Novedades,
                        comentarios: this.d11Comentarios,
                    },
                    {
                        detalle: '1.875',
                        m2: '1',
                        despacho: this.d12,
                        totalDespachar: this.d12Total,
                        carga: this.d12Carga,
                        totalDespacho: this.d12CargaTotal,
                        novedades: this.d12Novedades,
                        comentarios: this.d12Comentarios,
                    },
                    {
                        detalle: '2.00',
                        m2: '1',
                        despacho: this.d13,
                        totalDespachar: this.d13Total,
                        carga: this.d13Carga,
                        totalDespacho: this.d13CargaTotal,
                        novedades: this.d13Novedades,
                        comentarios: this.d13Comentarios,
                    },
                    {
                        detalle: '2.125',
                        m2: '1',
                        despacho: this.d14,
                        totalDespachar: this.d14Total,
                        carga: this.d14Carga,
                        totalDespacho: this.d14CargaTotal,
                        novedades: this.d14Novedades,
                        comentarios: this.d14Comentarios,
                    },
                    {
                        detalle: '2.25',
                        m2: '1',
                        despacho: this.d15,
                        totalDespachar: this.d15Total,
                        carga: this.d15Carga,
                        totalDespacho: this.d15CargaTotal,
                        novedades: this.d15Novedades,
                        comentarios: this.d15Comentarios,
                    },
                    {
                        detalle: '2.375',
                        m2: '1',
                        despacho: this.d16,
                        totalDespachar: this.d16Total,
                        carga: this.d16Carga,
                        totalDespacho: this.d16CargaTotal,
                        novedades: this.d16Novedades,
                        comentarios: this.d16Comentarios,
                    },
                    {
                        detalle: '2.50',
                        m2: '1',
                        despacho: this.d17,
                        totalDespachar: this.d17Total,
                        carga: this.d17Carga,
                        totalDespacho: this.d17CargaTotal,
                        novedades: this.d17Novedades,
                        comentarios: this.d17Comentarios,
                    },
                    {
                        detalle: '2.625',
                        m2: '1',
                        despacho: this.d18,
                        totalDespachar: this.d18Total,
                        carga: this.d18Carga,
                        totalDespacho: this.d18CargaTotal,
                        novedades: this.d18Novedades,
                        comentarios: this.d18Comentarios,
                    },
                    {
                        detalle: '2.75',
                        m2: '1',
                        despacho: this.d19,
                        totalDespachar: this.d19Total,
                        carga: this.d19Carga,
                        totalDespacho: this.d19CargaTotal,
                        novedades: this.d19Novedades,
                        comentarios: this.d19Comentarios,
                    },
                    {
                        detalle: '2.875',
                        m2: '1',
                        despacho: this.d20,
                        totalDespachar: this.d20Total,
                        carga: this.d20Carga,
                        totalDespacho: this.d20CargaTotal,
                        novedades: this.d20Novedades,
                        comentarios: this.d20Comentarios,
                    },
                    {
                        detalle: '3.00',
                        m2: '1',
                        despacho: this.d21,
                        totalDespachar: this.d21Total,
                        carga: this.d21Carga,
                        totalDespacho: this.d21CargaTotal,
                        novedades: this.d21Novedades,
                        comentarios: this.d21Comentarios,
                    },
                    {
                        detalle: '3.125',
                        m2: '1',
                        despacho: this.d22,
                        totalDespachar: this.d22Total,
                        carga: this.d22Carga,
                        totalDespacho: this.d22CargaTotal,
                        novedades: this.d22Novedades,
                        comentarios: this.d22Comentarios,
                    },
                    {
                        detalle: '3.25',
                        m2: '1',
                        despacho: this.d23,
                        totalDespachar: this.d23Total,
                        carga: this.d23Carga,
                        totalDespacho: this.d23CargaTotal,
                        novedades: this.d23Novedades,
                        comentarios: this.d23Comentarios,
                    },
                    {
                        detalle: '3.375',
                        m2: '1',
                        despacho: this.d24,
                        totalDespachar: this.d24Total,
                        carga: this.d14Carga,
                        totalDespacho: this.d24CargaTotal,
                        novedades: this.d24Novedades,
                        comentarios: this.d24Comentarios,
                    },
                    {
                        detalle: '3.50',
                        m2: '1',
                        despacho: this.d25,
                        totalDespachar: this.d25Total,
                        carga: this.d25Carga,
                        totalDespacho: this.d25CargaTotal,
                        novedades: this.d25Novedades,
                        comentarios: this.d25Comentarios,
                    },
                ],
                client: '',
                direction: '',
                driver: '',
                m2: 0,
                mpa: 0,
                morterosCat: '',
                dinteles: true,
                status: '',
                confirmation: true,
            },
        ];
        console.log('Guardar', insert);

        if (this.edit) {
            if (this.date.length === 0 || this.client.length === 0) {
                this.date = '';
                this.client = '';
                this.direction = '';
                this.driver = '';
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

                let insert = [
                    {
                        date: '',
                        week: 0,
                        plate: '',
                        block: [
                            {
                                detalle: '10 Sin Bisel',
                                m2: '8.09',
                                despacho: this.m210,
                                totalDespachar: this.m210Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m210Comentarios,
                            },
                            {
                                detalle: '12 Sin Bisel',
                                m2: '8.09',
                                despacho: this.m212,
                                totalDespachar: this.m212Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m212Comentarios,
                            },
                            {
                                detalle: '20 Sin Bisel',
                                m2: '8.09',
                                despacho: this.m220,
                                totalDespachar: this.m220Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m220Comentarios,
                            },
                            {
                                detalle: '25 Sin Bisel',
                                m2: '8.09',
                                despacho: this.m225,
                                totalDespachar: this.m225Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m225Comentarios,
                            },

                            {
                                detalle: '10 Con Bisel',
                                m2: '8.09',
                                despacho: this.m210c,
                                totalDespachar: this.m210cTotal,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m210cComentarios,
                            },
                            {
                                detalle: '12 Con Bisel',
                                m2: '8.09',
                                despacho: this.m212c,
                                totalDespachar: this.m212cTotal,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m212cComentarios,
                            },
                            {
                                detalle: '20 Con Bisel',
                                m2: '8.09',
                                despacho: this.m220c,
                                totalDespachar: this.m220cTotal,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m220cComentarios,
                            },
                            {
                                detalle: '25 Con Bisel',
                                m2: '8.09',
                                despacho: this.m225c,
                                totalDespachar: this.m225cTotal,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.m225cComentarios,
                            },
                        ],
                        grout: [
                            {
                                detalle: 'Nivelación',
                                m2: '60',
                                despacho: this.n60,
                                totalDespachar: this.n60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.n60Comentarios,
                            },
                            {
                                detalle: 'Estandar',
                                m2: '60',
                                despacho: this.e60,
                                totalDespachar: this.e60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.e60Comentarios,
                            },
                            {
                                detalle: 'Plus',
                                m2: '60',
                                despacho: this.p60,
                                totalDespachar: this.p60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.p60Comentarios,
                            },
                        ],
                        morteros: [
                            {
                                detalle: 'Estandar',
                                m2: '60',
                                despacho: this.es60,
                                totalDespachar: this.es60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.es60Comentarios,
                            },
                            {
                                detalle: 'Plus',
                                m2: '60',
                                despacho: this.plus60,
                                totalDespachar: this.plus60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.plus60Comentarios,
                            },
                        ],
                        recubrimientos: [
                            {
                                detalle: 'Deko',
                                m2: '60',
                                despacho: this.deko60,
                                totalDespachar: this.deko60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.deko60Comentarios,
                            },
                            {
                                detalle: 'Finish',
                                m2: '60',
                                despacho: this.fin60,
                                totalDespachar: this.fin60Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.fin60Comentarios,
                            },
                        ],
                        dintel: [
                            {
                                detalle: '0.5',
                                m2: '1',
                                despacho: this.d1,
                                totalDespachar: this.d1Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d1Comentarios,
                            },
                            {
                                detalle: '0.625',
                                m2: '1',
                                despacho: this.d2,
                                totalDespachar: this.d2Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d2Comentarios,
                            },
                            {
                                detalle: '0.75',
                                m2: '1',
                                despacho: this.d3,
                                totalDespachar: this.d3Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d3Comentarios,
                            },
                            {
                                detalle: '0.875',
                                m2: '1',
                                despacho: this.d4,
                                totalDespachar: this.d4Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d4Comentarios,
                            },
                            {
                                detalle: '1.00',
                                m2: '1',
                                despacho: this.d5,
                                totalDespachar: this.d5Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d5Comentarios,
                            },
                            {
                                detalle: '1.125',
                                m2: '1',
                                despacho: this.d6,
                                totalDespachar: this.d6Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d6Comentarios,
                            },
                            {
                                detalle: '1.25',
                                m2: '1',
                                despacho: this.d7,
                                totalDespachar: this.d7Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d7Comentarios,
                            },
                            {
                                detalle: '1.375',
                                m2: '1',
                                despacho: this.d8,
                                totalDespachar: this.d8Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d8Comentarios,
                            },
                            {
                                detalle: '1.50',
                                m2: '1',
                                despacho: this.d9,
                                totalDespachar: this.d9Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d9Comentarios,
                            },
                            {
                                detalle: '1.625',
                                m2: '1',
                                despacho: this.d10,
                                totalDespachar: this.d10Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d10Comentarios,
                            },
                            {
                                detalle: '1.75',
                                m2: '1',
                                despacho: this.d11,
                                totalDespachar: this.d11Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d11Comentarios,
                            },
                            {
                                detalle: '1.875',
                                m2: '1',
                                despacho: this.d12,
                                totalDespachar: this.d12Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d12Comentarios,
                            },
                            {
                                detalle: '2.00',
                                m2: '1',
                                despacho: this.d13,
                                totalDespachar: this.d13Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d13Comentarios,
                            },
                            {
                                detalle: '2.125',
                                m2: '1',
                                despacho: this.d14,
                                totalDespachar: this.d14Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d14Comentarios,
                            },
                            {
                                detalle: '2.25',
                                m2: '1',
                                despacho: this.d15,
                                totalDespachar: this.d15Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d15Comentarios,
                            },
                            {
                                detalle: '2.375',
                                m2: '1',
                                despacho: this.d16,
                                totalDespachar: this.d16Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d16Comentarios,
                            },
                            {
                                detalle: '2.50',
                                m2: '1',
                                despacho: this.d17,
                                totalDespachar: this.d17Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d17Comentarios,
                            },
                            {
                                detalle: '2.625',
                                m2: '1',
                                despacho: this.d18,
                                totalDespachar: this.d18Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d18Comentarios,
                            },
                            {
                                detalle: '2.75',
                                m2: '1',
                                despacho: this.d19,
                                totalDespachar: this.d19Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d19Comentarios,
                            },
                            {
                                detalle: '2.875',
                                m2: '1',
                                despacho: this.d20,
                                totalDespachar: this.d20Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d20Comentarios,
                            },
                            {
                                detalle: '3.00',
                                m2: '1',
                                despacho: this.d21,
                                totalDespachar: this.d21Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d21Comentarios,
                            },
                            {
                                detalle: '3.125',
                                m2: '1',
                                despacho: this.d22,
                                totalDespachar: this.d22Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d22Comentarios,
                            },
                            {
                                detalle: '3.25',
                                m2: '1',
                                despacho: this.d23,
                                totalDespachar: this.d23Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d23Comentarios,
                            },
                            {
                                detalle: '3.375',
                                m2: '1',
                                despacho: this.d24,
                                totalDespachar: this.d24Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d24Comentarios,
                            },
                            {
                                detalle: '3.50',
                                m2: '1',
                                despacho: this.d25,
                                totalDespachar: this.d25Total,
                                carga: '',
                                totalDespacho: '',
                                novedades: '',
                                comentarios: this.d25Comentarios,
                            },
                        ],
                        client: '',
                        direction: '',
                        driver: '',
                        m2: 0,
                        mpa: 0,
                        morterosCat: '',
                        dinteles: true,
                        status: '',
                        confirmation: true,
                    },
                ];

                let edit = {
                    _id: this.id,
                    date: newDate,
                    client: this.client,
                    direction: this.direction,
                    driver: this.driver,
                    confirmation: this.confirmation,
                    plate: this.plate,
                    block: [
                        {
                            detalle: '10 Sin Bisel',
                            m2: '8.09',
                            despacho: this.m210,
                            totalDespachar: this.m210Total,
                            carga: this.m210Carga,
                            totalDespacho: this.m210CargaTotal,
                            novedades: this.m210Novedades,
                            comentarios: this.m210Comentarios,
                        },
                        {
                            detalle: '12 Sin Bisel',
                            m2: '8.09',
                            despacho: this.m212,
                            totalDespachar: this.m212Total,
                            carga: this.m212Carga,
                            totalDespacho: this.m212CargaTotal,
                            novedades: this.m212Comentarios,
                            comentarios: this.m212Comentarios,
                        },
                        {
                            detalle: '20 Sin Bisel',
                            m2: '8.09',
                            despacho: this.m220,
                            totalDespachar: this.m220Total,
                            carga: this.m220Carga,
                            totalDespacho: this.m220CargaTotal,
                            novedades: this.m220Novedades,
                            comentarios: this.m220Comentarios,
                        },
                        {
                            detalle: '25 Sin Bisel',
                            m2: '8.09',
                            despacho: this.m225,
                            totalDespachar: this.m225Total,
                            carga: this.m225Carga,
                            totalDespacho: this.m225CargaTotal,
                            novedades: this.m225Novedades,
                            comentarios: this.m225Comentarios,
                        },

                        {
                            detalle: '10 Con Bisel',
                            m2: '8.09',
                            despacho: this.m210c,
                            totalDespachar: this.m210cTotal,
                            carga: this.m210cCarga,
                            totalDespacho: this.m210cCargaTotal,
                            novedades: this.m210Novedades,
                            comentarios: this.m210Comentarios,
                        },
                        {
                            detalle: '12 Con Bisel',
                            m2: '8.09',
                            despacho: this.m212c,
                            totalDespachar: this.m212cTotal,
                            carga: this.m212cCarga,
                            totalDespacho: this.m212cCargaTotal,
                            novedades: this.m212cNovedades,
                            comentarios: this.m212cComentarios,
                        },
                        {
                            detalle: '20 Con Bisel',
                            m2: '8.09',
                            despacho: this.m220c,
                            totalDespachar: this.m220cTotal,
                            carga: this.m220cCarga,
                            totalDespacho: this.m220cCargaTotal,
                            novedades: this.m220cNovedades,
                            comentarios: this.m220cComentarios,
                        },
                        {
                            detalle: '25 Con Bisel',
                            m2: '8.09',
                            despacho: this.m225c,
                            totalDespachar: this.m225cTotal,
                            carga: this.m225cCarga,
                            totalDespacho: this.m225cCargaTotal,
                            novedades: this.m225cNovedades,
                            comentarios: this.m225cComentarios,
                        },
                    ],
                    grout: [
                        {
                            detalle: 'Nivelación',
                            m2: '60',
                            despacho: this.n60,
                            totalDespachar: this.n60Total,
                            carga: this.n60Carga,
                            totalDespacho: this.n60CargaTotal,
                            novedades: this.n60Novedades,
                            comentarios: this.n60Comentarios,
                        },
                        {
                            detalle: 'Estandar',
                            m2: '60',
                            despacho: this.e60,
                            totalDespachar: this.e60Total,
                            carga: this.e60Carga,
                            totalDespacho: this.e60CargaTotal,
                            novedades: this.e60Novedades,
                            comentarios: this.e60Comentarios,
                        },
                        {
                            detalle: 'Plus',
                            m2: '60',
                            despacho: this.p60,
                            totalDespachar: this.p60Total,
                            carga: this.p60Carga,
                            totalDespacho: this.p60CargaTotal,
                            novedades: this.p60Novedades,
                            comentarios: this.p60Comentarios,
                        },
                    ],
                    morteros: [
                        {
                            detalle: 'Estandar',
                            m2: '60',
                            despacho: this.es60,
                            totalDespachar: this.es60Total,
                            carga: this.es60Carga,
                            totalDespacho: this.es60CargaTotal,
                            novedades: this.es60Novedades,
                            comentarios: this.es60Comentarios,
                        },
                        {
                            detalle: 'Plus',
                            m2: '60',
                            despacho: this.plus60,
                            totalDespachar: this.plus60Total,
                            carga: this.plus60Carga,
                            totalDespacho: this.plus60CargaTotal,
                            novedades: this.plus60Novedades,
                            comentarios: this.plus60Comentarios,
                        },
                    ],
                    recubrimientos: [
                        {
                            detalle: 'Deko',
                            m2: '60',
                            despacho: this.deko60,
                            totalDespachar: this.deko60Total,
                            carga: this.deko60Carga,
                            totalDespacho: this.deko60CargaTotal,
                            novedades: this.deko60Novedades,
                            comentarios: this.deko60Comentarios,
                        },
                        {
                            detalle: 'Finish',
                            m2: '60',
                            despacho: this.fin60,
                            totalDespachar: this.fin60Total,
                            carga: this.fin60Carga,
                            totalDespacho: this.fin60CargaTotal,
                            novedades: this.fin60Novedades,
                            comentarios: this.fin60Comentarios,
                        },
                    ],
                    dintel: [
                        {
                            detalle: '0.5',
                            m2: '1',
                            despacho: this.d1,
                            totalDespachar: this.d1Total,
                            carga: this.d1Carga,
                            totalDespacho: this.d1CargaTotal,
                            novedades: this.d1Novedades,
                            comentarios: this.d1Comentarios,
                        },
                        {
                            detalle: '0.625',
                            m2: '1',
                            despacho: this.d2,
                            totalDespachar: this.d2Total,
                            carga: this.d2Carga,
                            totalDespacho: this.d2CargaTotal,
                            novedades: this.d2Novedades,
                            comentarios: this.d2Comentarios,
                        },
                        {
                            detalle: '0.75',
                            m2: '1',
                            despacho: this.d3,
                            totalDespachar: this.d3Total,
                            carga: this.d3Carga,
                            totalDespacho: this.d3CargaTotal,
                            novedades: this.d3Novedades,
                            comentarios: this.d3Comentarios,
                        },
                        {
                            detalle: '0.875',
                            m2: '1',
                            despacho: this.d4,
                            totalDespachar: this.d4Total,
                            carga: this.d4Carga,
                            totalDespacho: this.d4CargaTotal,
                            novedades: this.d4Novedades,
                            comentarios: this.d4Comentarios,
                        },
                        {
                            detalle: '1.00',
                            m2: '1',
                            despacho: this.d5,
                            totalDespachar: this.d5Total,
                            carga: this.d5Carga,
                            totalDespacho: this.d5CargaTotal,
                            novedades: this.d5Novedades,
                            comentarios: this.d5Comentarios,
                        },
                        {
                            detalle: '1.125',
                            m2: '1',
                            despacho: this.d6,
                            totalDespachar: this.d6Total,
                            carga: this.d6Carga,
                            totalDespacho: this.d6CargaTotal,
                            novedades: this.d6Novedades,
                            comentarios: this.d6Comentarios,
                        },
                        {
                            detalle: '1.25',
                            m2: '1',
                            despacho: this.d7,
                            totalDespachar: this.d7Total,
                            carga: this.d7Carga,
                            totalDespacho: this.d7CargaTotal,
                            novedades: this.d7Novedades,
                            comentarios: this.d7Comentarios,
                        },
                        {
                            detalle: '1.375',
                            m2: '1',
                            despacho: this.d8,
                            totalDespachar: this.d8Total,
                            carga: this.d8Carga,
                            totalDespacho: this.d8CargaTotal,
                            novedades: this.d8Novedades,
                            comentarios: this.d8Comentarios,
                        },
                        {
                            detalle: '1.50',
                            m2: '1',
                            despacho: this.d9,
                            totalDespachar: this.d9Total,
                            carga: this.d9Carga,
                            totalDespacho: this.d9CargaTotal,
                            novedades: this.d9Novedades,
                            comentarios: this.d9Comentarios,
                        },
                        {
                            detalle: '1.625',
                            m2: '1',
                            despacho: this.d10,
                            totalDespachar: this.d10Total,
                            carga: this.d10Carga,
                            totalDespacho: this.d10CargaTotal,
                            novedades: this.d10Novedades,
                            comentarios: this.d10Comentarios,
                        },
                        {
                            detalle: '1.75',
                            m2: '1',
                            despacho: this.d11,
                            totalDespachar: this.d11Total,
                            carga: this.d11Carga,
                            totalDespacho: this.d11CargaTotal,
                            novedades: this.d11Novedades,
                            comentarios: this.d11Comentarios,
                        },
                        {
                            detalle: '1.875',
                            m2: '1',
                            despacho: this.d12,
                            totalDespachar: this.d12Total,
                            carga: this.d12Carga,
                            totalDespacho: this.d12CargaTotal,
                            novedades: this.d12Novedades,
                            comentarios: this.d12Comentarios,
                        },
                        {
                            detalle: '2.00',
                            m2: '1',
                            despacho: this.d13,
                            totalDespachar: this.d13Total,
                            carga: this.d13Carga,
                            totalDespacho: this.d13CargaTotal,
                            novedades: this.d13Novedades,
                            comentarios: this.d13Comentarios,
                        },
                        {
                            detalle: '2.125',
                            m2: '1',
                            despacho: this.d14,
                            totalDespachar: this.d14Total,
                            carga: this.d14Carga,
                            totalDespacho: this.d14CargaTotal,
                            novedades: this.d14Novedades,
                            comentarios: this.d14Comentarios,
                        },
                        {
                            detalle: '2.25',
                            m2: '1',
                            despacho: this.d15,
                            totalDespachar: this.d15Total,
                            carga: this.d15Carga,
                            totalDespacho: this.d15CargaTotal,
                            novedades: this.d15Novedades,
                            comentarios: this.d15Comentarios,
                        },
                        {
                            detalle: '2.375',
                            m2: '1',
                            despacho: this.d16,
                            totalDespachar: this.d16Total,
                            carga: this.d16Carga,
                            totalDespacho: this.d16CargaTotal,
                            novedades: this.d16Novedades,
                            comentarios: this.d16Comentarios,
                        },
                        {
                            detalle: '2.50',
                            m2: '1',
                            despacho: this.d17,
                            totalDespachar: this.d17Total,
                            carga: this.d17Carga,
                            totalDespacho: this.d17CargaTotal,
                            novedades: this.d17Novedades,
                            comentarios: this.d17Comentarios,
                        },
                        {
                            detalle: '2.625',
                            m2: '1',
                            despacho: this.d18,
                            totalDespachar: this.d18Total,
                            carga: this.d18Carga,
                            totalDespacho: this.d18CargaTotal,
                            novedades: this.d18Novedades,
                            comentarios: this.d18Comentarios,
                        },
                        {
                            detalle: '2.75',
                            m2: '1',
                            despacho: this.d19,
                            totalDespachar: this.d19Total,
                            carga: this.d19Carga,
                            totalDespacho: this.d19CargaTotal,
                            novedades: this.d19Novedades,
                            comentarios: this.d19Comentarios,
                        },
                        {
                            detalle: '2.875',
                            m2: '1',
                            despacho: this.d20,
                            totalDespachar: this.d20Total,
                            carga: this.d20Carga,
                            totalDespacho: this.d20CargaTotal,
                            novedades: this.d20Novedades,
                            comentarios: this.d20Comentarios,
                        },
                        {
                            detalle: '3.00',
                            m2: '1',
                            despacho: this.d21,
                            totalDespachar: this.d21Total,
                            carga: this.d21Carga,
                            totalDespacho: this.d21CargaTotal,
                            novedades: this.d21Novedades,
                            comentarios: this.d21Comentarios,
                        },
                        {
                            detalle: '3.125',
                            m2: '1',
                            despacho: this.d22,
                            totalDespachar: this.d22Total,
                            carga: this.d22Carga,
                            totalDespacho: this.d22CargaTotal,
                            novedades: this.d22Novedades,
                            comentarios: this.d22Comentarios,
                        },
                        {
                            detalle: '3.25',
                            m2: '1',
                            despacho: this.d23,
                            totalDespachar: this.d23Total,
                            carga: this.d23Carga,
                            totalDespacho: this.d23CargaTotal,
                            novedades: this.d23Novedades,
                            comentarios: this.d23Comentarios,
                        },
                        {
                            detalle: '3.375',
                            m2: '1',
                            despacho: this.d24,
                            totalDespachar: this.d24Total,
                            carga: this.d24Carga,
                            totalDespacho: this.d24CargaTotal,
                            novedades: this.d24Novedades,
                            comentarios: this.d24Comentarios,
                        },
                        {
                            detalle: '3.50',
                            m2: '1',
                            despacho: this.d25,
                            totalDespachar: this.d25Total,
                            carga: this.d25Carga,
                            totalDespacho: this.d25CargaTotal,
                            novedades: this.d25Novedades,
                            comentarios: this.d25Comentarios,
                        },
                    ],
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
                    this.plate = '';
                    this.botton = 'Guardar';
                    this.title = 'Agregar';
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
                block: [
                    {
                        detalle: '10 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m210,
                        totalDespachar: this.m210Total,
                        carga: this.m210Carga,
                        totalDespacho: this.m210CargaTotal,
                        novedades: this.m210Novedades,
                        comentarios: this.m210Comentarios,
                    },
                    {
                        detalle: '12 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m212,
                        totalDespachar: this.m212Total,
                        carga: this.m212Carga,
                        totalDespacho: this.m212CargaTotal,
                        novedades: this.m212Novedades,
                        comentarios: this.m212Comentarios,
                    },
                    {
                        detalle: '20 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m220,
                        totalDespachar: this.m220Total,
                        carga: this.m220Carga,
                        totalDespacho: this.m220CargaTotal,
                        novedades: this.m220Novedades,
                        comentarios: this.m220Comentarios,
                    },
                    {
                        detalle: '25 Sin Bisel',
                        m2: '8.09',
                        despacho: this.m225,
                        totalDespachar: this.m225Total,
                        carga: this.m225Carga,
                        totalDespacho: this.m225CargaTotal,
                        novedades: this.m225Novedades,
                        comentarios: this.m225Comentarios,
                    },

                    {
                        detalle: '10 Con Bisel',
                        m2: '8.09',
                        despacho: this.m210c,
                        totalDespachar: this.m210cTotal,
                        carga: this.m210cCarga,
                        totalDespacho: this.m210cCargaTotal,
                        novedades: this.m210cNovedades,
                        comentarios: this.m210Comentarios,
                    },
                    {
                        detalle: '12 Con Bisel',
                        m2: '8.09',
                        despacho: this.m212c,
                        totalDespachar: this.m212cTotal,
                        carga: this.m212cCarga,
                        totalDespacho: this.m212cCargaTotal,
                        novedades: this.m212cNovedades,
                        comentarios: this.m212cComentarios,
                    },
                    {
                        detalle: '20 Con Bisel',
                        m2: '8.09',
                        despacho: this.m220c,
                        totalDespachar: this.m220cTotal,
                        carga: this.m220cCarga,
                        totalDespacho: this.m220cCargaTotal,
                        novedades: this.m220cNovedades,
                        comentarios: this.m220cComentarios,
                    },
                    {
                        detalle: '25 Con Bisel',
                        m2: '8.09',
                        despacho: this.m225c,
                        totalDespachar: this.m225cTotal,
                        carga: this.m225cCarga,
                        totalDespacho: this.m225cCargaTotal,
                        novedades: this.m225cNovedades,
                        comentarios: this.m225cComentarios,
                    },
                ],
                grout: [
                    {
                        detalle: 'Nivelación',
                        m2: '60',
                        despacho: this.n60,
                        totalDespachar: this.n60Total,
                        carga: this.n60Carga,
                        totalDespacho: this.n60CargaTotal,
                        novedades: this.n60Novedades,
                        comentarios: this.n60Comentarios,
                    },
                    {
                        detalle: 'Estandar',
                        m2: '60',
                        despacho: this.e60,
                        totalDespachar: this.e60Total,
                        carga: this.e60Carga,
                        totalDespacho: this.e60CargaTotal,
                        novedades: this.e60Novedades,
                        comentarios: this.e60Comentarios,
                    },
                    {
                        detalle: 'Plus',
                        m2: '60',
                        despacho: this.p60,
                        totalDespachar: this.p60Total,
                        carga: this.p60Carga,
                        totalDespacho: this.p60CargaTotal,
                        novedades: this.p60Novedades,
                        comentarios: this.p60Comentarios,
                    },
                ],
                morteros: [
                    {
                        detalle: 'Estandar',
                        m2: '60',
                        despacho: this.es60,
                        totalDespachar: this.es60Total,
                        carga: this.es60Carga,
                        totalDespacho: this.es60CargaTotal,
                        novedades: this.es60Novedades,
                        comentarios: this.es60Comentarios,
                    },
                    {
                        detalle: 'Plus',
                        m2: '60',
                        despacho: this.plus60,
                        totalDespachar: this.plus60Total,
                        carga: this.plus60Carga,
                        totalDespacho: this.plus60CargaTotal,
                        novedades: this.plus60Novedades,
                        comentarios: this.plus60Comentarios,
                    },
                ],
                recubrimientos: [
                    {
                        detalle: 'Deko',
                        m2: '60',
                        despacho: this.deko60,
                        totalDespachar: this.deko60Total,
                        carga: this.deko60Carga,
                        totalDespacho: this.deko60CargaTotal,
                        novedades: this.deko60Novedades,
                        comentarios: this.deko60Comentarios,
                    },
                    {
                        detalle: 'Finish',
                        m2: '60',
                        despacho: this.fin60,
                        totalDespachar: this.fin60Total,
                        carga: this.fin60Carga,
                        totalDespacho: this.fin60CargaTotal,
                        novedades: this.fin60Novedades,
                        comentarios: this.fin60Comentarios,
                    },
                ],
                dintel: [
                    {
                        detalle: '0.5',
                        m2: '1',
                        despacho: this.d1,
                        totalDespachar: this.d1Total,
                        carga: this.d1Carga,
                        totalDespacho: this.d1CargaTotal,
                        novedades: this.d1Novedades,
                        comentarios: this.d1Comentarios,
                    },
                    {
                        detalle: '0.625',
                        m2: '1',
                        despacho: this.d2,
                        totalDespachar: this.d2Total,
                        carga: this.d2Carga,
                        totalDespacho: this.d2CargaTotal,
                        novedades: this.d2Novedades,
                        comentarios: this.d2Comentarios,
                    },
                    {
                        detalle: '0.75',
                        m2: '1',
                        despacho: this.d3,
                        totalDespachar: this.d3Total,
                        carga: this.d3Carga,
                        totalDespacho: this.d3CargaTotal,
                        novedades: this.d3Novedades,
                        comentarios: this.d3Comentarios,
                    },
                    {
                        detalle: '0.875',
                        m2: '1',
                        despacho: this.d4,
                        totalDespachar: this.d4Total,
                        carga: this.d4Carga,
                        totalDespacho: this.d4CargaTotal,
                        novedades: this.d4Novedades,
                        comentarios: this.d4Comentarios,
                    },
                    {
                        detalle: '1.00',
                        m2: '1',
                        despacho: this.d5,
                        totalDespachar: this.d5Total,
                        carga: this.d5Carga,
                        totalDespacho: this.d5CargaTotal,
                        novedades: this.d5Novedades,
                        comentarios: this.d5Comentarios,
                    },
                    {
                        detalle: '1.125',
                        m2: '1',
                        despacho: this.d6,
                        totalDespachar: this.d6Total,
                        carga: this.d6Carga,
                        totalDespacho: this.d6CargaTotal,
                        novedades: this.d6Novedades,
                        comentarios: this.d6Comentarios,
                    },
                    {
                        detalle: '1.25',
                        m2: '1',
                        despacho: this.d7,
                        totalDespachar: this.d7Total,
                        carga: this.d7Carga,
                        totalDespacho: this.d7CargaTotal,
                        novedades: this.d7Novedades,
                        comentarios: this.d7Comentarios,
                    },
                    {
                        detalle: '1.375',
                        m2: '1',
                        despacho: this.d8,
                        totalDespachar: this.d8Total,
                        carga: this.d8Carga,
                        totalDespacho: this.d8CargaTotal,
                        novedades: this.d8Novedades,
                        comentarios: this.d8Comentarios,
                    },
                    {
                        detalle: '1.50',
                        m2: '1',
                        despacho: this.d9,
                        totalDespachar: this.d9Total,
                        carga: this.d9Carga,
                        totalDespacho: this.d9CargaTotal,
                        novedades: this.d9Novedades,
                        comentarios: this.d9Comentarios,
                    },
                    {
                        detalle: '1.625',
                        m2: '1',
                        despacho: this.d10,
                        totalDespachar: this.d10Total,
                        carga: this.d10Carga,
                        totalDespacho: this.d10CargaTotal,
                        novedades: this.d10Novedades,
                        comentarios: this.d10Comentarios,
                    },
                    {
                        detalle: '1.75',
                        m2: '1',
                        despacho: this.d11,
                        totalDespachar: this.d11Total,
                        carga: this.d11Carga,
                        totalDespacho: this.d11CargaTotal,
                        novedades: this.d11Novedades,
                        comentarios: this.d11Comentarios,
                    },
                    {
                        detalle: '1.875',
                        m2: '1',
                        despacho: this.d12,
                        totalDespachar: this.d12Total,
                        carga: this.d12Carga,
                        totalDespacho: this.d12CargaTotal,
                        novedades: this.d12Novedades,
                        comentarios: this.d12Comentarios,
                    },
                    {
                        detalle: '2.00',
                        m2: '1',
                        despacho: this.d13,
                        totalDespachar: this.d13Total,
                        carga: this.d13Carga,
                        totalDespacho: this.d13CargaTotal,
                        novedades: this.d13Novedades,
                        comentarios: this.d13Comentarios,
                    },
                    {
                        detalle: '2.125',
                        m2: '1',
                        despacho: this.d14,
                        totalDespachar: this.d14Total,
                        carga: this.d14Carga,
                        totalDespacho: this.d14CargaTotal,
                        novedades: this.d14Novedades,
                        comentarios: this.d14Comentarios,
                    },
                    {
                        detalle: '2.25',
                        m2: '1',
                        despacho: this.d15,
                        totalDespachar: this.d15Total,
                        carga: this.d15Carga,
                        totalDespacho: this.d15CargaTotal,
                        novedades: this.d15Novedades,
                        comentarios: this.d15Comentarios,
                    },
                    {
                        detalle: '2.375',
                        m2: '1',
                        despacho: this.d16,
                        totalDespachar: this.d16Total,
                        carga: this.d16Carga,
                        totalDespacho: this.d16CargaTotal,
                        novedades: this.d16Novedades,
                        comentarios: this.d16Comentarios,
                    },
                    {
                        detalle: '2.50',
                        m2: '1',
                        despacho: this.d17,
                        totalDespachar: this.d17Total,
                        carga: this.d17Carga,
                        totalDespacho: this.d17CargaTotal,
                        novedades: this.d17Novedades,
                        comentarios: this.d17Comentarios,
                    },
                    {
                        detalle: '2.625',
                        m2: '1',
                        despacho: this.d18,
                        totalDespachar: this.d18Total,
                        carga: this.d18Carga,
                        totalDespacho: this.d18CargaTotal,
                        novedades: this.d18Novedades,
                        comentarios: this.d18Comentarios,
                    },
                    {
                        detalle: '2.75',
                        m2: '1',
                        despacho: this.d19,
                        totalDespachar: this.d19Total,
                        carga: this.d19Carga,
                        totalDespacho: this.d19CargaTotal,
                        novedades: this.d19Novedades,
                        comentarios: this.d19Comentarios,
                    },
                    {
                        detalle: '2.875',
                        m2: '1',
                        despacho: this.d20,
                        totalDespachar: this.d20Total,
                        carga: this.d20Carga,
                        totalDespacho: this.d20CargaTotal,
                        novedades: this.d20Novedades,
                        comentarios: this.d20Comentarios,
                    },
                    {
                        detalle: '3.00',
                        m2: '1',
                        despacho: this.d21,
                        totalDespachar: this.d21Total,
                        carga: this.d21Carga,
                        totalDespacho: this.d21CargaTotal,
                        novedades: this.d21Novedades,
                        comentarios: this.d21Comentarios,
                    },
                    {
                        detalle: '3.125',
                        m2: '1',
                        despacho: this.d22,
                        totalDespachar: this.d22Total,
                        carga: this.d22Carga,
                        totalDespacho: this.d22CargaTotal,
                        novedades: this.d22Novedades,
                        comentarios: this.d22Comentarios,
                    },
                    {
                        detalle: '3.25',
                        m2: '1',
                        despacho: this.d23,
                        totalDespachar: this.d23Total,
                        carga: this.d23Carga,
                        totalDespacho: this.d23CargaTotal,
                        novedades: this.d23Novedades,
                        comentarios: this.d23Comentarios,
                    },
                    {
                        detalle: '3.375',
                        m2: '1',
                        despacho: this.d24,
                        totalDespachar: this.d24Total,
                        carga: this.d24Carga,
                        totalDespacho: this.d24CargaTotal,
                        novedades: this.d24Novedades,
                        comentarios: this.d24Comentarios,
                    },
                    {
                        detalle: '3.50',
                        m2: '1',
                        despacho: this.d25,
                        totalDespachar: this.d25Total,
                        carga: this.d25Carga,
                        totalDespacho: this.d25CargaTotal,
                        novedades: this.d25Novedades,
                        comentarios: this.d25Comentarios,
                    },
                ],
                status: this.status,
                newBloc: this.newBloc,
                confirmation: this.confirmation,
                personUpdate: JSON.parse(localStorage.getItem('user')).name,
                plate: this.plate,
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
                this.coment1 = '';
                this.coment2 = '';
                this.coment3 = '';
                this.plate = '';
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
                        this.coment1 = '';
                        this.coment2 = '';
                        this.coment3 = '';
                        this.plate = '';
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
                    this.coment1 = '';
                    this.coment2 = '';
                    this.coment3 = '';
                    this.plate = '';
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
        this.plate = this.plate;

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

    numPositivo($event) {
        const input = $event.target as HTMLInputElement;
        let value = parseFloat(input.value);
        if (value < 0) {
            input.value = '';
        }
    }

    keyPress(unidad, despacho, variable) {
        if (variable === 'm210Total' && despacho > 0) {
            this.m210Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm210CargaTotal' && despacho > 0) {
            this.m210CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm212Total' && despacho > 0) {
            this.m212Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm212CargaTotal' && despacho > 0) {
            this.m212CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm220Total' && despacho > 0) {
            this.m220Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm220CargaTotal' && despacho > 0) {
            this.m220CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm225Total' && despacho > 0) {
            this.m225Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm225CargaTotal' && despacho > 0) {
            this.m225CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        ////////////
        if (variable === 'm210cTotal' && despacho > 0) {
            this.m210cTotal = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm210cCargaTotal' && despacho > 0) {
            this.m210cCargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm212cTotal' && despacho > 0) {
            this.m212cTotal = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm212cCargaTotal' && despacho > 0) {
            this.m212cCargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm220cTotal' && despacho > 0) {
            this.m220cTotal = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm220cCargaTotal' && despacho > 0) {
            this.m220cCargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'm225cTotal' && despacho > 0) {
            this.m225cTotal = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'm225cCargaTotal' && despacho > 0) {
            this.m225cCargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        ////////
        if (variable === 'n60Total' && despacho > 0) {
            this.n60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'n60CargaTotal' && despacho > 0) {
            this.n60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'e60Total' && despacho > 0) {
            this.e60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'e60CargaTotal' && despacho > 0) {
            this.e60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'p60Total' && despacho > 0) {
            this.p60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'p60CargaTotal' && despacho > 0) {
            this.p60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        /////////

        if (variable === 'es60Total' && despacho > 0) {
            this.es60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'es60CargaTotal' && despacho > 0) {
            this.es60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'plus60Total' && despacho > 0) {
            this.plus60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'plus60CargaTotal' && despacho > 0) {
            this.plus60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }

        ////////
        if (variable === 'deko60Total' && despacho > 0) {
            this.deko60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'deko60CargaTotal' && despacho > 0) {
            this.deko60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'fin60Total' && despacho > 0) {
            this.fin60Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'fin60CargaTotal' && despacho > 0) {
            this.fin60CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        ///////////////
        if (variable === 'd1Total' && despacho > 0) {
            this.d1Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd1CargaTotal' && despacho > 0) {
            this.d1CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd2Total' && despacho > 0) {
            this.d2Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd2CargaTotal' && despacho > 0) {
            this.d2CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd3Total' && despacho > 0) {
            this.d3Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd3CargaTotal' && despacho > 0) {
            this.d3CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd4Total' && despacho > 0) {
            this.d4Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd4CargaTotal' && despacho > 0) {
            this.d4CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd5Total' && despacho > 0) {
            this.d5Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd5CargaTotal' && despacho > 0) {
            this.d5CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd6Total' && despacho > 0) {
            this.d6Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd6CargaTotal' && despacho > 0) {
            this.d6CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd7Total' && despacho > 0) {
            this.d7Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd7CargaTotal' && despacho > 0) {
            this.d7CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd8Total' && despacho > 0) {
            this.d8Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd8CargaTotal' && despacho > 0) {
            this.d8CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd9Total' && despacho > 0) {
            this.d9Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd9CargaTotal' && despacho > 0) {
            this.d9CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd10Total' && despacho > 0) {
            this.d10Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd10CargaTotal' && despacho > 0) {
            this.d10CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd11Total' && despacho > 0) {
            this.d11Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd11CargaTotal' && despacho > 0) {
            this.d11CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd12Total' && despacho > 0) {
            this.d12Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd12CargaTotal' && despacho > 0) {
            this.d12CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd13Total' && despacho > 0) {
            this.d13Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd13CargaTotal' && despacho > 0) {
            this.d13CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd14Total' && despacho > 0) {
            this.d14Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd14CargaTotal' && despacho > 0) {
            this.d14CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd15Total' && despacho > 0) {
            this.d15Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd15CargaTotal' && despacho > 0) {
            this.d15CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd16Total' && despacho > 0) {
            this.d16Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd16CargaTotal' && despacho > 0) {
            this.d16CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd17Total' && despacho > 0) {
            this.d17Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd17CargaTotal' && despacho > 0) {
            this.d17CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd18Total' && despacho > 0) {
            this.d18Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd18CargaTotal' && despacho > 0) {
            this.d18CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd19Total' && despacho > 0) {
            this.d19Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd19CargaTotal' && despacho > 0) {
            this.d19CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd20Total' && despacho > 0) {
            this.d20Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd20CargaTotal' && despacho > 0) {
            this.d20CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd21Total' && despacho > 0) {
            this.d21Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd21CargaTotal' && despacho > 0) {
            this.d21CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd22Total' && despacho > 0) {
            this.d22Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd22CargaTotal' && despacho > 0) {
            this.d22CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd23Total' && despacho > 0) {
            this.d23Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd23CargaTotal' && despacho > 0) {
            this.d23CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd24Total' && despacho > 0) {
            this.d24Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd24CargaTotal' && despacho > 0) {
            this.d24CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
        if (variable === 'd25Total' && despacho > 0) {
            this.d25Total = parseFloat((unidad * despacho).toFixed(2));
        } else if (variable === 'd25CargaTotal' && despacho > 0) {
            this.d25CargaTotal = parseFloat((unidad * despacho).toFixed(2));
        }
    }
}
