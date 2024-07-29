import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SlideService } from 'app/services/slide/slide.service';
import { ClientService } from '../../../../services/client/client.service';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AlertService } from 'app/services/alert.service';

@Component({
    selector: 'academy-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademyListComponent implements OnInit, OnDestroy {
    //categories: Category[];
    courses: any[];
    filteredCourses: any[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    idPerson = '';
    namePerson = '';
    typeRolUser = '';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _activosService: SlideService,
        private _client: ClientService,
        private routerService: Router,
        private _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private readonly alertService: AlertService
    ) {
        console.log(this._authService.sessionDto.user.rol[0].role);
        this.typeRolUser = this._authService.sessionDto.user.rol[0].role;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.idPerson = params.get('id');

            localStorage.setItem('idPerson', params.get('id'));

            console.log(params.get('id'));
            this.consultarProyectos();
        });
        this._client.findAllRuc(this.idPerson).subscribe((data: any) => {
            console.log(data);

            this.namePerson = data.name + ' ' + data.lastName;
        });
    }

    consultarProyectos() {
        this._activosService.findProject(this.idPerson).subscribe((data) => {
            console.log(data);
            // this.categories = data;
            this.courses = [data];
            this.filteredCourses = data;

            // Mark for check
            this._changeDetectorRef.markForCheck();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    nuevo(): void {
        {
            this.routerService.navigateByUrl(
                '/projects/new-project/' + this.idPerson
            );
        }
    }
    eliminarProyecto(proyecto) {
        console.log('Proyecto', proyecto);

        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar el Proyecto',
            message:
                '¿Está seguro de que desea eliminar este proyecto? ¡Esta acción no se puede deshacer!',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                console.log('eliminado');
                this._activosService.delete(proyecto).subscribe((data) => {
                    console.log(data);
                    this.consultarProyectos();
                    this.alertService.mensajeSuccess('Eliminado Correctamente');
                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                });
            }
        });
    }
}
