import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { InventarioDto } from '../../dtos/inventario.dto';

@Injectable({
    providedIn: 'root',
})
export class InventarioService {
    private nombreModelo = 'boonker-int-warehouse-real';
    private nombreModeloBodegas = 'boonker-int-warehouse';

    constructor(
        private readonly httpClientService: HttpClient,
        private readonly autenticacionService: AuthService
    ) {}

    findAll(): Observable<any[]> {
        return this.httpClientService.get<InventarioDto[]>(
            environment.url + this.nombreModelo
        );
    }

    findAllBodegas(): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo
        );
    }
}
