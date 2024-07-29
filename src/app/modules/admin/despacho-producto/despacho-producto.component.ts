import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';

@Component({
    selector: 'app-despacho-producto',
    templateUrl: './despacho-producto.component.html',
    styleUrls: ['./despacho-producto.component.scss'],
})
export class DespachoProductoComponent implements OnInit {
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

    constructor(
        private routerService: Router,
        private readonly alertService: AlertService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        let ingre = [];
        this.mampuesto$ = new MatTableDataSource(ingre);
        this.mampuesto$.paginator = this._paginator;
        this.mampuesto$.sort = this._sort;
        this._changeDetectorRef.markForCheck();
    }
}
