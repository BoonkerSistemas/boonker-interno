import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { StockService } from 'app/services/stock/stock.service';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
    isLoading: boolean = false;
    mampuesto$: MatTableDataSource<any>;
    displayedColumnsMampuesto: string[] = [
        'mampuesto',
        'orificio',
        'tipo',
        'cantidad',
        'fecha',
    ];
    @ViewChild('_paginator') _paginator: MatPaginator;
    @ViewChild(MatSort) _sort: MatSort;

    morteros$: MatTableDataSource<any>;
    displayedColumnsMorteros: string[] = ['tipo', 'cantidad', 'fecha'];
    @ViewChild('_paginatorMorteros')
    _paginatorMorteros: MatPaginator;
    @ViewChild(MatSort) private _sortMorteros: MatSort;

    dinteles$: MatTableDataSource<any>;
    displayedColumnsDinteles: string[] = [
        'tipo',
        'metros',
        'cantidad',
        'fecha',
    ];
    @ViewChild('_paginatorDinteles')
    _paginatorDinteles: MatPaginator;
    @ViewChild(MatSort) private _sortDinteles: MatSort;
    constructor(
        private routerService: Router,
        private readonly alertService: AlertService,
        private _changeDetectorRef: ChangeDetectorRef,
        private stockService: StockService
    ) {}

    ngOnInit() {
        this.getStockActual();
        this.getStockGraficas();
        let ingre = [];
        this.mampuesto$ = new MatTableDataSource(ingre);
        this.mampuesto$.paginator = this._paginator;
        this.mampuesto$.sort = this._sort;
        ///////////////////////////////////////////////////////////////////////////
        let materiales = [];
        this.morteros$ = new MatTableDataSource(materiales);
        this.morteros$.paginator = this._paginatorMorteros;
        this.morteros$.sort = this._sortMorteros;
        ////////////////////////////////////////////////////////////////////
        this.dinteles$ = new MatTableDataSource(materiales);
        this.dinteles$.paginator = this._paginatorDinteles;
        this.dinteles$.sort = this._sortDinteles;

        this._changeDetectorRef.markForCheck();
    }

    getStockActual() {
        this.stockService.findAll().subscribe((data) => {
            // console.log('data', data);
        });
    }
    getStockGraficas() {
        this.stockService
            .findAllStockReal('Mampuesto Estructural')
            .subscribe((data) => {
                // console.log('Data Graficas', data);
            });
    }
}
