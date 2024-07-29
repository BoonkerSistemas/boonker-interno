import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { UpdateResultDto } from '../../dtos/update-result.dto';
import { InsertResultDto } from '../../dtos/insert-result.dto';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class TurneroDespachosService {
    private nombreModelo = 'board-canva';
    private nombreModelo2 = '/pre-guia'

    constructor(
        private readonly httpClientService: HttpClient,
        private readonly autenticacionService: AuthService,
        private readonly userService: UserService
    ) {}

    create(objeto: any): Observable<any> {
        // console.log(objeto);
        const url = environment.url + this.nombreModelo;
        return this.httpClientService.post<InsertResultDto>(url, objeto);
    }

    findAllFechas(fechaInicio, fechaFin): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url +
                this.nombreModelo +
                '/date/' +
                fechaInicio +
                '/' +
                fechaFin
        );
    }

    findAllSemana(numSemana): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo + '/date/' + numSemana
        );
    }

    findAllSemana1(numSemana): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo + '/dateg/' + numSemana
        );
    }

    findOne(numSemana: any): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo + '/board/' + numSemana
        );
    }

    updateOneById(objeto: any): Observable<UpdateResultDto> {
        // console.log(objeto);
        const url = environment.url + this.nombreModelo + "/" + objeto._id;

        return this.httpClientService.patch<UpdateResultDto>(url, objeto);
    }

    delete(objeto: any): Observable<any> {
        return this.httpClientService.delete<any>(
            environment.url + this.nombreModelo + `/${objeto._id}`
        );
    }

    getPreGuia(): Observable<any> {
        const url = environment.urlProvisional + this.nombreModelo + this.nombreModelo2
        return this.httpClientService.get<any>(url
            //environment.url + this.nombreModelo + this.nombreModelo2
        )
    }
}
