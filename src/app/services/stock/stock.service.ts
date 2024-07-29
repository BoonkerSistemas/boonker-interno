import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { UpdateResultDto } from '../../dtos/update-result.dto';
import { InsertResultDto } from '../../dtos/insert-result.dto';

@Injectable({
    providedIn: 'root',
})
export class StockService {
    private nombreModelo = 'stock';

    constructor(
        private readonly httpClientService: HttpClient,
        private readonly autenticacionService: AuthService
    ) {}

    create(objeto: any): Observable<any> {
        const url = environment.url + this.nombreModelo;
        return this.httpClientService.post<InsertResultDto>(url, objeto);
    }

    findAll(): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo
        );
    }

    findAllStock(data): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo+'/type/'+data
        )
    }

    findAllType(type): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo + '/type/' + type
        );
    }

    updateOneById(objeto: any): Observable<UpdateResultDto> {
        // console.log(objeto);
        const url = environment.url + this.nombreModelo + '/' + objeto._id;

        return this.httpClientService.patch<UpdateResultDto>(url, objeto);
    }

    findOneById(id): Observable<any[]> {
        return this.httpClientService.get<any>(
            environment.url + this.nombreModelo + '/' + id
        );
    }

    delete(objeto: any): Observable<any> {
        return this.httpClientService.delete<any>(
            environment.url + this.nombreModelo + `/${objeto._id}`
        );
    }

    findAllStockReal(tipo): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + 'stock-real/' + tipo
        );
    }
}
