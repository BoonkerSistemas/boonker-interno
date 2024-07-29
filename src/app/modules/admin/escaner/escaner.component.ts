import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, UntypedFormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ClientService} from "../../../services/client/client.service";
import {MatDialog} from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {DetallesClienteComponent} from "../cliente/detalles/detallesCliente.component";

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrl: './escaner.component.scss'
})

export class EscanerComponent implements OnInit{

    display: boolean = false
    scannedCode: string;

    ngOnInit(): void {
        window.addEventListener('message', this.receiveMessage.bind(this), false);
    }

    receiveMessage(event: MessageEvent): void {
        
        if (event.origin !== 'https://form.jotform.com') {
          return;
        }
    
        this.scannedCode = event.data;
    }

    viewPage() {
        this.display = !this.display
    }

}
