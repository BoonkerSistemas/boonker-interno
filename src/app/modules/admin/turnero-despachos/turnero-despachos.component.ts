import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TurneroDespachosService} from 'app/services/turneroDespachos/turneroDespachos.service';
import {MatDialog} from '@angular/material/dialog';
import {DetallesTurneroComponent} from './detalles/detallesTurnero.component';
import moment from "moment";
import {AlertService} from "../../../services/alert.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-turnero-despachos',
    templateUrl: './turnero-despachos.component.html',
    styleUrls: ['./turnero-despachos.component.scss'],

})
export class TurneroDespachosComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    mampuesto$: MatTableDataSource<any>;
    fechaActual = new Date().toLocaleDateString();
    semana: any = '';
    displayedColumnsMampuesto: string[] = [
        'fecha',
        'cliente',
        'destino',
        'transporte',
        'dinteles',
        'confirmacion',
        'accion'
    ];
    @ViewChild('_paginator') _paginator: MatPaginator;
    @ViewChild(MatSort) _sort: MatSort;
    rolLogin = '';

    timerId: any;
    fechaSincronizacion: Date;
    weekFormat: string[] = [];


    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tuneroDespachosService: TurneroDespachosService,
        private alertService: AlertService,
        private _matDialog: MatDialog,
    ) {
    }

    ngOnInit() {
        let usuario = JSON.parse(localStorage.getItem('user'));
        this.rolLogin = usuario.rol[0].role;
        console.log('Usuario', this.rolLogin);

        this.semanaActual();
        this.cargarData();
        //this.timerId = setInterval(() => this.cargarData(), 30000);
        this.timerId = setInterval(() => this.cargarData(), 1800000);
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
        this.getDate()
        this.fechaSincronizacion = new Date()
        this._tuneroDespachosService
            .findAllSemana(this.semana)
            .subscribe((data) => {
                console.log('DATAAAA', data);
                console.log(new Date(data[0].date).toLocaleDateString());
                console.log(new Date().toLocaleDateString());
                console.log(
                    'Validacion',
                    new Date(data[0].date).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                );

                data.forEach((element) => {
                    let nuevo = []
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
                });
                this.mampuesto$ = new MatTableDataSource(data);
                this.mampuesto$.paginator = this._paginator;
                this.mampuesto$.sort = this._sort;
                this._changeDetectorRef.markForCheck();
            });
    }

    addNewProyect(element: any): void {
        const dialogRef = this._matDialog.open(DetallesTurneroComponent, {
            autoFocus: false,
            data: element,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result)
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
            title: "¿Deseas eliminar este campo?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero eliminar!",
            cancelButtonText: "Cancelar!",
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(element);

                let edit = {
                    _id: element._id,
                };


                this._tuneroDespachosService.delete(edit).subscribe(data => {
                    this.alertService.mensajeSuccess(
                        'Eliminado Correctamente'
                    );
                    this.cargarData();
                    this.ngOnInit();
                })


            }
        });
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
}
