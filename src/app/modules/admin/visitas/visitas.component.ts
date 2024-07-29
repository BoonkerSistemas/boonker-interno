import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {QuillViewComponent} from "ngx-quill";
import {Subject} from "rxjs";
import {RolesService} from "../../../services/roles/roles.service";
import {UserService} from "../../../core/user/user.service";
import {AlertService} from "../../../services/alert.service";
import {CrearRolesComponent} from "../roles/crearRoles/crearRoles.component";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {VisitasService} from "../../../services/roles/visitas.service";
import {CrearIngresoComponent} from "./escanaerIngreso/crearIngreso.component";

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrl: './visitas.component.scss'
})
export class VisitasComponent {
    data: any;
    dialogRef: MatDialogRef<any>;
    @ViewChild("paginator") paginator: MatPaginator;
    @ViewChild("editorText") editorText!: QuillViewComponent;
    calificaciones: any[] = [];
    budgetDetails: any = {
        columns: ["name", "status", "HoraIngreso","HoraSalida"],
    };
    estado: boolean = false;
    rowDetails: any = [];
    user: string = "";
    name: string = "";
    mail: string = "";
    tipo: string = "";
    editRegion: any = [];
    edit = false;
    dataregiones = [];
    title = "Agregar";
    botton = "Guardar";
    permissionArray;

    progress = 0;
    imageUrlDesktop = "";
    message: any;

    previewMobil = "";
    preview = "";
    permisosSeleccionados = [];
    id: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    permission: any;

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private userService: VisitasService,
        private usService: UserService,
        private readonly alertService: AlertService
    ) {}

    openDialog(element): void {
        const dialogRef = this.dialog.open(CrearIngresoComponent, {
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getRegiones();
            this.getPermission();
        });
        this.getRegiones();
        this.getPermission();
    }
    ngOnInit(): void {
        this.getRegiones();
        this.getPermission();
    }

    getRegiones() {
        this.userService.findAll().subscribe((data) => {

            data.sort(function (a, b) {
                var textA = new Date(a.updatedAt).getTime();
                var textB = new Date(b.updatedAt).getTime();
                return textA > textB ? -1 : textA < textB ? 1 : 0;
            });

            this.dataregiones = data;
            this.rowDetails = new MatTableDataSource(data);
            this.rowDetails.paginator = this.paginator;
            this._changeDetectorRef.markForCheck();
        });
    }

    getPermission() {
        this.userService.findAllPermisos().subscribe((data) => {
            this.permission = data;
            this.permission.forEach((value: { checked: boolean }) => {
                value.checked = false;
            });
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

    async guardarRegion() {
        let user = [];
        if (this.edit) {
            let flag = false;



            this.permisosSeleccionados.forEach((item) => {
                if (item.checked === true) {
                    flag = true;
                }
            });

            await this.permission.forEach((item) => {
                if (item.checked === true) {
                    flag = true;
                }
            });

            if (
                this.name.length === 0 ||
                this.permisosSeleccionados.length < 1 ||
                flag === false
            ) {
                this.name = "";
                this.estado = false;
                this.getRegiones();
                this.getPermission();
                this.botton = "Guardar";
                this.title = "Agregar";
                this.edit = false;
                this.alertService.mensajeError(
                    "No se guardo el registro, completa todos los datos"
                );
            } else {
                let edit = {
                    _id: this.id,
                    role: this.name.toUpperCase(),
                    permission: this.permisosSeleccionados,
                    active: this.estado,
                };

                (await this.userService.updateOneById(edit)).subscribe(async (data) => {
                    await this.alertService.mensajeSuccess("Actualizado Correctamente");
                    this.getRegiones();
                    this.getPermission();
                    this.name = "";
                    this.estado = false;
                    this.permisosSeleccionados = [];
                    this.botton = "Guardar";
                    this.title = "Agregar";
                    this.edit = false;
                    this.dialogRef.afterClosed().subscribe((res) => {});
                    //  this._changeDetectorRef.markForCheck();
                });
            }

            this.edit = false;
        } else {
            let insert = {
                role: this.name.toUpperCase(),
                permission: this.permisosSeleccionados,
                active: this.estado,
            };
            if (insert.role.length === 0 || insert.permission.length < 1) {
                this.name = "";
                this.permission = this.permisosSeleccionados;
                this.getRegiones();
                this.getPermission();
                this.botton = "Guardar";
                this.title = "Agregar";
                this.alertService.mensajeError(
                    "No se guardo el registro, completa todos los datos"
                );
            } else {
                this.userService.create(insert).subscribe((data) => {
                    if (data.msm) {
                        this.alertService.mensajeError(data.msm);
                    } else {
                        this.name = "";
                        this.user = "";
                        this.mail = "";
                        this.permisosSeleccionados = [];
                        this.tipo = "3";
                        this.preview = "";
                        this.previewMobil = "";
                        this.preview = "";
                        this.previewMobil = "";
                        this.alertService.mensajeSuccess("Guardado Correctamente");
                    }
                    this.getRegiones();
                    this.getPermission();
                    this.name = "";
                    this._changeDetectorRef.markForCheck();
                });
            }
        }
    }

    editarRegion(element) {

        this.title = "Editar";
        this.botton = "Actualizar";
        this.name = element.role;

        let permisos = element.permission;
        permisos.forEach((item: any) => {
            this.permission.forEach((val) => {
                if (item._id === val._id) {
                    val.checked = true;
                }
            });
        });

        this.permisosSeleccionados = permisos;

        this.estado = element.active;
        this.edit = true;
        this.id = element._id;
        this.openDialog(element);
    }

    eliminarRegion(element) {
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
                this.userService.delete(element).subscribe((data) => {
                    this.alertService.mensajeSuccess("Eliminado Correctamente");
                    this.getRegiones();
                    this.getPermission();
                    this.permisosSeleccionados = [];
                    this.name = element.name;
                    this.estado = false;
                    this._changeDetectorRef.markForCheck();
                });
            }
        });
    }

    cerrar() {
        this.name = "";
        this.estado = false;
        this.getPermission();
        this.title = "Agregar";
        this.botton = "Guardar";
        this.edit = false;
    }

    checkCheckBoxValuePermission(per, event) {
        let es = event.checked;
        per.checked = es;

        if (es === true) {
            this.permisosSeleccionados.push(per);
        } else {

            this.permisosSeleccionados = this.permisosSeleccionados.filter(
                (item) => item._id !== per._id
            );
        }
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.rowDetails.filter = filterValue.trim().toLowerCase();
        if (this.rowDetails.paginator) {
            this.rowDetails.paginator.firstPage();
        }
    }

    getSelectedValue(item: { target: { value: string } }) {
        this.tipo = item.target.value;
    }

    checkCheckBoxvalue(event) {
        this.estado = event.checked;
    }
}
