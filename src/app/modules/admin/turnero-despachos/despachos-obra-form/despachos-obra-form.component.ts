import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-visita-obra-form',
    templateUrl: './despachos-obra-form.component.html',
    styleUrl: './despachos-obra-form.component.scss',
})
export class DespachosObraFormComponent {
    idProyect;
    constructor(private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.idProyect = params.get('idProyect');

            console.log(params);
        });
    }

    ngOnInit(): void {}
}
