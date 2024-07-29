
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from "@angular/material/table";
import { InventarioDto } from '../../../dtos/inventario.dto'
import { InventarioService } from '../../../services/inventario/inventario.service'
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss',
})
export class InventarioComponent {

  inventaryColumns: any = ['name', 'code', 'store', 'amount']

  inventary: any = []
  @ViewChild("paginator") paginator: MatPaginator;

    progress = 0;
    imageUrlDesktop = '';
    message: any;

  constructor(private inventarioService: InventarioService) {}

    ngOnInit(): void {
        this.getInventary()
    }

  getInventary() {
    this.inventarioService.findAll().subscribe((data) => {
      this.inventary = new MatTableDataSource(data)
      this.inventary.paginator = this.paginator
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.inventary.filter = filterValue.trim().toLowerCase();
    if (this.inventary.paginator) {
      this.inventary.paginator.firstPage();
    }
  }

}
