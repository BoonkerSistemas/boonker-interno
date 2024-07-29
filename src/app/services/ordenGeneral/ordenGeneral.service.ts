import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/auth/auth.service';
import {UsuarioDto} from '../../dtos/usuario.dto';
import {UpdateResultDto} from '../../dtos/update-result.dto';
import {InsertResultDto} from '../../dtos/insert-result.dto';
import {UserService} from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class OrdenGeneralService {
    private nombreModelo = 'product';
    private nombreModeloOrder = 'order-product';
    private nombreModeloDespacho = 'generate-dispach';
    private nombreModeloFinanzas = 'generate-dispach/se'
    private nombreModeloValidarFinanzas = 'generate-dispach/finanzas'

    constructor(
        private readonly httpClientService: HttpClient,
        private readonly autenticacionService: AuthService,
        private readonly userService: UserService
    ) {
    }

    create(objeto: any): Observable<any> {
        // console.log(objeto);
        const url = environment.url + this.nombreModelo;
        return this.httpClientService.post<InsertResultDto>(url, objeto);
    }

    createOrdertProduct(objeto: any): Observable<any> {
        // console.log(objeto);
        const url = environment.url + this.nombreModeloOrder;
        console.log('url ', url)
        return this.httpClientService.post<InsertResultDto>(url, objeto);
    }

    findAllProductos(): Observable<any[]> {
        return this.httpClientService.get<any[]>(
            environment.url + this.nombreModelo
        );
    }

    delete(objeto: any): Observable<any> {
        return this.httpClientService.delete<any>(
            environment.url + this.nombreModelo + `/${objeto._id}`
        );
    }

    findOneById(id): Observable<any[]> {
        return this.httpClientService.get<any>(
            environment.url + this.nombreModeloOrder + '/project/' + id
        );
    }

    sendNotificationFinanzas(id): Observable<any[]> {
        console.log('finanzas ', environment.url + this.nombreModeloFinanzas + `${id}`)
        return this.httpClientService.get<any>(
            environment.url + this.nombreModeloFinanzas + `${id}`
            
        )
    }

    // newDespacho(idOP,idProyect, pesoTransporte): Observable<any[]> {
    //     return this.httpClientService.get<any>(
    //         environment.url +
    //         this.nombreModeloDespacho +
    //         `/${idProyect}` +
    //         `/${idOP}` +
    //         `/${pesoTransporte}`
    //     );
    // }

    newDespachoActual(idOrder, idModulo, pesoTransporte): Observable<any[]> {
        return this.httpClientService.get<any>(
            environment.url +
                this.nombreModeloDespacho +
                `/${idOrder}` +
                `/${idModulo}` +
                `/${pesoTransporte}`
        );
    }

    generateDespacho(idModule): Observable<any[]> {
        return this.httpClientService.get<any>(
            environment.url + this.nombreModeloDespacho + `/${idModule}`
        );
    }

    validarDespacho(idModulo, idProyect) {
        //console.log('finanzas ', environment.url + this.nombreModeloDespacho + '/se'+`/${idModulo}`)
        return this.httpClientService.post<any>(environment.url + this.nombreModeloFinanzas +`/${idModulo}`+ `/${idProyect}`,{})
    }

    verificarValores(idModulo, idProyect, pago) {
        console.log('finanzas ',idModulo)
        return this.httpClientService.post<any>(
            environment.url + this.nombreModeloValidarFinanzas + `/${idModulo}`+ `/${idProyect}`+ `/${pago}`,{}
        )
    }
}
