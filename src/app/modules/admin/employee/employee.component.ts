import {Component, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ClientService} from "../../../services/client/client.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
    @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

    course: any;

    constructor(private _colaboradoresService: ClientService,  private _matDialog: MatDialog, ) {}

    ngOnInit(): void {

        let user= JSON.parse(localStorage.getItem('user'))
        this._colaboradoresService.findOne(user._id).subscribe( async (result: any) => {
            if (result) {
                console.log(result)

                this.course= result;
            }
        })
    }

}
