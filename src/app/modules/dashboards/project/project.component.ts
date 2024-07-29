import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { ProjectService } from 'app/modules/dashboards/project/project.service';
import { StockService } from 'app/services/stock/stock.service';
//var _ = require('lodash');
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateFormat } from 'assets/date-format';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { items } from 'app/mock-api/apps/file-manager/data';
interface TableData {
  name: string;
  data: number[];
}

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DateAdapter, useClass: DateFormat }],
})
export class ProjectComponent implements OnInit, OnDestroy {
    data: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    dataStockBoonker = [];

    dataStockMorteros = [];
    dataStockDinteles = [];
    crearFormGroup: FormGroup;
    dataProduccion;

    displayedColumns: string[] = [
        'TIPO',
        '1 Ducto',
        '2 Ductos',
        'Mixto',
        'Maestra',
        'Maestra Nueva',
        'Macho',
        'Hembra',
    ];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    dataTable: any[] = [];

    displayedColumns2: string[] = [
        'TIPO',
        '1 Ducto',
        '2 Ductos',
        'Mixto',
        'Maestra',
        'Maestra Nueva',
        'Macho',
        'Hembra',
    ];
    columnsToDisplay2: string[] = this.displayedColumns2.slice();
    dataTable2: any[] = [];

    displayedColumns3: string[] = [
        'TIPO',
        '1 Ducto',
        '2 Ductos',
        'Mixto',
        'Maestra',
        'Maestra Nueva',
        '3 Ductos',
    ];
    columnsToDisplay3: string[] = this.displayedColumns3.slice();
    dataTable3: any[] = [];

    displayedColumnsMorteros: string[] = ['TIPO', 'total', 'palets'];
    columnsToDisplayMorteros: string[] = this.displayedColumnsMorteros.slice();
    dataTableMorteros: any[] = [];

    stockColumns: any = ['tipo', 'subtipo', 'mes', 'amount']
    stock: any = []
    
    @ViewChild("paginator") paginator: MatPaginator;

    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ApexOptions>;
    //Grafica Morteros
    @ViewChild('morteros') chartMorteros: ChartComponent;
    public morterosOptions: Partial<ApexOptions>;

    @ViewChild('morterosPie') chartMorterosPie: ChartComponent;
    public morterosOptionsPie: Partial<ApexOptions>;
    
    //Graficas mamposteria
    @ViewChild('mamposteria12Circle') chartMorterosCircle12: ChartComponent;
    public chartOptionsCircleMamposteria12: Partial<ApexOptions>;

    @ViewChild('mamposteria12Circle20') chartMorterosCircle20: ChartComponent;
    public chartOptionsCircleMamposteria20: Partial<ApexOptions>;


    // @ViewChild('morterosAA') chartMorterosAA: ChartComponent;
    // public morterosOptionsAA: Partial<ApexOptions>;

    // @ViewChild('morterosDK') chartMorterosDK: ChartComponent;
    // public morterosOptionsDK: Partial<ApexOptions>;

    // @ViewChild('morterosGE') chartMorterosGE: ChartComponent;
    // public morterosOptionsGE: Partial<ApexOptions>;

    // @ViewChild('morterosGP') chartMorterosGP: ChartComponent;
    // public morterosOptionsGP: Partial<ApexOptions>;

    // @ViewChild('morterosNV') chartMorterosNV: ChartComponent;
    // public morterosOptionsNV: Partial<ApexOptions>;
    
    // @ViewChild('morterosSE') chartMorterosSE: ChartComponent;
    // public morterosOptionsSE: Partial<ApexOptions>;

    @ViewChild('mamposteria6') chartMampostero6: ChartComponent;
    public momposteroOption6: Partial<ApexOptions>;

    // @ViewChild('mamposteriaDoble') chartMamposteroDoble: ChartComponent;
    // public momposteroOptionDoble: Partial<ApexOptions>;

    // @ViewChild('mamposteriaHM') chartMamposteroHM: ChartComponent;
    // public momposteroOptionHM: Partial<ApexOptions>;

    // @ViewChild('mamposteriaHembra') chartMamposteroHembra: ChartComponent;
    // public momposteroOptionHembra: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMacho') chartMamposteroMacho: ChartComponent;
    // public momposteroOptionMacho: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMaestra') chartMamposteroMaestra: ChartComponent;
    // public momposteroOptionMaestra: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMaestraNueva') chartMamposteroMaestraNueva: ChartComponent;
    // public momposteroOptionMaestraNueva: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMixto') chartMamposteroMixto: ChartComponent;
    // public momposteroOptionMixto: Partial<ApexOptions>;

    @ViewChild('mamposteria620') chartMampostero620: ChartComponent;
    public momposteroOption620: Partial<ApexOptions>;

    // @ViewChild('mamposteriaHM20') chartMamposteroHM20: ChartComponent;
    // public momposteroOptionHM20: Partial<ApexOptions>;

    // @ViewChild('mamposteriaHembra20') chartMamposteroHembra20: ChartComponent;
    // public momposteroOptionHembra20: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMaestra20') chartMamposteroMaestra20: ChartComponent;
    // public momposteroOptionMaestra20: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMaestraNueva20') chartMamposteroMaestraNueva20: ChartComponent;
    // public momposteroOptionMaestraNueva20: Partial<ApexOptions>;

    // @ViewChild('mamposteriaMixto20') chartMamposteroMixto20: ChartComponent;
    // public momposteroOptionMixto20: Partial<ApexOptions>;

    //Grafica Dintel
    @ViewChild('dintel') chartDintel: ChartComponent;
    public dintelOption: Partial<ApexOptions>;

    @ViewChild('dintelMesesTotal') chartDintelTotal: ChartComponent;
    public dintelOptionTotal: Partial<ApexOptions>;

    

    displayedColumns12: string[] = [
        'TIPO',
        '1 Ducto',
        '2 Ductos',
        'Mixto',
        'Maestra',
        'Maestra Nueva',
        'Macho',
        'Hembra',
        '3 Ductos',
    ];
    columnsToDisplay12: string[] = this.displayedColumns12.slice();
    dataTable12: any[] = [];

    displayedColumns20: string[] = [
        'TIPO',
        '1 Ducto',
        '2 Ductos',
        'Mixto',
        'Maestra',
        'Maestra Nueva',
        'Macho',
        'Hembra',
        '3 Ductos',
    ];
    columnsToDisplay20: string[] = this.displayedColumns20.slice();
    dataTable20: any[] = [];

    //stock
    morteros: any[] = []
    sumasMensuales = {}
    morterosView = false
    mamposteriaView = false
    dintelesView = false
    dintelesSuma = {}

    //filtro
    filtroFN: string = '03'
    filtroMamposteria12: string = '01'
    filtroMamposteria20: string = '01'
    filtroDintel: string = '01'

    stockMorteros:any = []

    inventarioMamposteria = {}
    morteroAA = {}

    sumaMamposteria12 = {}
    sumaMamposteria14 = {}
    sumaMamposteria20 = {}

    datosTotales = []

    datosGraficaMortero = []

    //targetas sumaMes
    sumaFN: number = 0
    mesVistaFN: string = ''
    mesVistaMampuesto12: string = ''
    mesVistaMampuesto20: string = ''
    mesVistaDintel: string = ''
    sumaDK: number = 0
    sumaGE: number = 0
    sumaGP: number = 0
    sumaNV: number = 0
    sumaSE: number = 0
    sumaM6: number = 0
    sumaMDoble: number = 0
    sumaMHM: number = 0
    sumaMHembra: number = 0
    sumaMMacho: number = 0
    sumaMMaestra: number = 0
    sumaMMaestraNueva: number = 0
    sumaMMixto: number = 0
    sumaM620: number = 0
    sumaMDoble20: number = 0
    sumaMHM20: number = 0
    sumaMHembra20: number = 0
    sumaMMaestra20: number = 0
    sumaMMaestraNueva20: number = 0
    sumaMMixto20: number = 0
    dintelesGraficaTotal050: number = 0
    dintelesGraficaTotal062: number = 0
    dintelesGraficaTotal075: number = 0
    dintelesGraficaTotal085: number = 0
    dintelesGraficaTotal100: number = 0
    dintelesGraficaTotal112: number = 0
    dintelesGraficaTotal125: number = 0
    dintelesGraficaTotal137: number = 0
    dintelesGraficaTotal150: number = 0
    dintelesGraficaTotal162: number = 0
    dintelesGraficaTotal175: number = 0
    dintelesGraficaTotal187: number = 0
    dintelesGraficaTotal200: number = 0
    dintelesGraficaTotal212: number = 0
    dintelesGraficaTotal225: number = 0
    dintelesGraficaTotal237: number = 0
    dintelesGraficaTotal250: number = 0
    dintelesGraficaTotal262: number = 0
    dintelesGraficaTotal275: number = 0
    dintelesGraficaTotal287: number = 0
    dintelesGraficaTotal300: number = 0
    dintelesGraficaTotal312: number = 0
    dintelesGraficaTotal325: number = 0
    dintelesGraficaTotal337: number = 0
    dintelesGraficaTotal350: number = 0
    dintelesGraficaTotal500: number = 0
    dintelesGraficaTotal625: number = 0
    dintelesGraficaTotal750: number = 0
    dintelesGraficaTotal875: number = 0

    //filtro por fechas
    fechaInicio: string = '2024-03-01'
    fechaFin:string = '2024-06-30'
    mesesNombre: string[] = []
    //tabla dinteles
    displayedColumnsDinteles: string[] = ['name', ...this.mesesNombre]
    displayedColumnsMorterosTabla: string[] = []
    //tabladiinteleshistorico
    tablaDinteles: any[] = []
    cantidadSeries: number = 2
    dataSource$: MatTableDataSource<any>;

    //valores morteros total meses
    groutNivelacion = 0
    morteroDK = 0 
    groutEstandar = 0
    groutPlus = 0 
    morteroNV = 0
    sealEstandar = 0
    TablaMorteros: any[] = []
    dataSourceMorteros$ = new MatTableDataSource([])

    //valores mamposteria 12 total meses
    sinBicel6 = 0
    dobleSin = 0
    HMSin = 0
    HembraSin = 0
    machoCon = 0
    maestraCon = 0
    maestraSin = 0
    maestraNuevaSin = 0
    mixtoCon = 0
    mixtoaSin = 0
    //valores mamposteria 20 total meses
    CB6 = 0
    SB6 = 0
    dobleSin20 = 0
    HMSin20 = 0
    hembraSin20 = 0
    maestraSin20 = 0
    maestraNuevaSin20 = 0
    mixtoSin20 = 0

    //
    mamposteria12 = []
    mamposteria20 = []

    /**
     * Constructor
     */
    constructor(
        private _projectService: ProjectService,
        private _router: Router,
        private stockService: StockService,
        private _changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.getStockGraficas();
        this.getStockGraficasMorteros();
        this.getStockGraficasDinteles();
        this.getDataProduction();
    }

    showMorteros() {
        this.morterosView = !this.morterosView
    }
    showMamposteria() {
        this.mamposteriaView = !this.mamposteriaView
    }
    showDinteles() {
        this.dintelesView = !this.dintelesView
    }

    cargarTabla() {
        // console.log(this.dataStockBoonker);
        let ELEMENT_DATA = [];
        let ELEMENT_DATA2 = [];
        let ELEMENT_DATA3 = [];
        this.dataStockBoonker.forEach((element, index) => {
            console.log(element.titulo);
            if (element.titulo.toUpperCase().includes('12')) {
                let inde = ELEMENT_DATA.length;
                ELEMENT_DATA.push({
                    TIPO: { valor: element.titulo },
                });
                element.data.forEach((element2) => {
                    if (element2.nombre !== 'H/M') {
                        ELEMENT_DATA[inde][element2.nombre] = {
                            orificios: element2.nombre2,
                            valor: element2.valor,
                        };
                    } else {
                        let inde2 = ELEMENT_DATA3.length;
                        ELEMENT_DATA3.push({
                            TIPO: { valor: element.titulo },
                        });
                        ELEMENT_DATA3[inde2][element2.nombre] = {
                            orificios: element2.nombre2,
                            valor: element2.valor,
                        };
                    }
                });
            } else if (element.titulo.toUpperCase().includes('20')) {
                let inde = ELEMENT_DATA2.length;
                ELEMENT_DATA2.push({
                    TIPO: { valor: element.titulo },
                });

                element.data.forEach((element2) => {
                    ELEMENT_DATA2[inde][element2.nombre] = {
                        orificios: element2.nombre2,
                        valor: element2.valor,
                    };
                    if (element2.nombre !== 'H/M') {
                        ELEMENT_DATA2[inde][element2.nombre] = {
                            orificios: element2.nombre2,
                            valor: element2.valor,
                        };
                    } else {
                        let inde2 = ELEMENT_DATA3.length;
                        ELEMENT_DATA3.push({
                            TIPO: { valor: element.titulo },
                        });
                        ELEMENT_DATA3[inde2][element2.nombre] = {
                            orificios: element2.nombre2,
                            valor: element2.valor,
                        };
                    }
                });
            }
        });
        let newData = [];
        let newData2 = [];
        let newData3 = [];

        ELEMENT_DATA.forEach((item) => {
            // console.log(item['6'])
            let defaul = { orificios: '', valor: '-' };
            let json = {
                '1 Ducto': item['6'] ? item['6'] : defaul,
                '2 Ductos': item['Doble'] ? item['Doble'] : defaul,
                Mixto: item['Mixto'] ? item['Mixto'] : defaul,
                Macho: item['Macho'] ? item['Macho'] : defaul,
                Hembra: item['Hembra'] ? item['Hembra'] : defaul,
                Maestra: item['Maestra'] ? item['Maestra'] : defaul,
                'Maestra Nueva': item['Maestra Nueva']
                    ? item['Maestra Nueva']
                    : defaul,
                TIPO: item['TIPO'] ? item['TIPO'] : defaul,
            };
            newData.push(json);
        });

        ELEMENT_DATA2.forEach((item) => {
            // console.log(item['6'])
            let defaul = { orificios: '', valor: '-' };
            let json = {
                '1 Ducto': item['6'] ? item['6'] : defaul,
                '2 Ductos': item['Doble'] ? item['Doble'] : defaul,
                Mixto: item['Mixto'] ? item['Mixto'] : defaul,
                Macho: item['Macho'] ? item['Macho'] : defaul,
                Hembra: item['Hembra'] ? item['Hembra'] : defaul,
                Maestra: item['Maestra'] ? item['Maestra'] : defaul,
                'Maestra Nueva': item['Maestra Nueva']
                    ? item['Maestra Nueva']
                    : defaul,
                TIPO: item['TIPO'] ? item['TIPO'] : defaul,
            };
            newData2.push(json);
        });

        ELEMENT_DATA3.forEach((item) => {
            // console.log(item['H/M'])
            let defaul = { orificios: '', valor: '-' };
            let json = {
                '1 Ducto': item['6'] ? item['6'] : defaul,
                '2 Ductos': item['Doble'] ? item['Doble'] : defaul,
                Mixto: item['Mixto'] ? item['Mixto'] : defaul,
                '3 Ductos': item['H/M'] ? item['H/M'] : defaul,
                Maestra: item['Maestra'] ? item['Maestra'] : defaul,
                'Maestra Nueva': item['Maestra Nueva']
                    ? item['Maestra Nueva']
                    : defaul,
                TIPO: item['TIPO'] ? item['TIPO'] : defaul,
            };
            newData3.push(json);
        });

        this.dataTable = newData;
        this.dataTable2 = newData2;
        this.dataTable3 = newData3;
        let totalMampuesto12: any = {
            '1 Ducto': {
                orificios: '',
                valor: 0,
            },
            '2 Ductos': {
                orificios: '',
                valor: 0,
            },
            Mixto: {
                orificios: '',
                valor: 0,
            },
            Macho: {
                orificios: '',
                valor: 0,
            },
            Hembra: {
                orificios: '',
                valor: 0,
            },
            Maestra: {
                orificios: '',
                valor: 0,
            },
            'Maestra Nueva': {
                orificios: '',
                valor: 0,
            },
            TIPO: {
                valor: 'Total Mampuestos 12 ',
            },
            '3 Ductos': {
                orificios: '',
                valor: 0,
            },
        };

        let totalMampuesto20: any = {
            '1 Ducto': {
                orificios: '',
                valor: 0,
            },
            '2 Ductos': {
                orificios: '',
                valor: 0,
            },
            Mixto: {
                orificios: '',
                valor: 0,
            },
            Macho: {
                orificios: '',
                valor: 0,
            },
            Hembra: {
                orificios: '',
                valor: 0,
            },
            Maestra: {
                orificios: '',
                valor: 0,
            },
            'Maestra Nueva': {
                orificios: '',
                valor: 0,
            },
            TIPO: {
                valor: 'Total Mampuestos 20 ',
            },
            '3 Ductos': {
                orificios: '',
                valor: 0,
            },
        };
        let nuevo12 = [];

        let nuevo20 = [];

        this.dataTable.forEach((element) => {
            if (element.TIPO.valor === 'Mampuestos 12 Sin Bisel') {
                console.log('verr', element);

                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };

                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto12['1 Ducto'].valor = (
                        parseInt(totalMampuesto12['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor)
                    ).toString();
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto12['2 Ductos'].valor =
                        parseInt(totalMampuesto12['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto12['3 Ductos'].valor =
                        parseInt(totalMampuesto12['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto12['Mixto'].valor =
                        parseInt(totalMampuesto12['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto12['Macho'].valor =
                        parseInt(totalMampuesto12['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto12['Hembra'].valor =
                        parseInt(totalMampuesto12['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto12['Maestra'].valor =
                        parseInt(totalMampuesto12['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto12['Maestra Nueva'].valor =
                        parseInt(totalMampuesto12['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }

                nuevo12.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 20 Sin Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };

                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }

                nuevo20.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 12 Con Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Con Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto12['1 Ducto'].valor =
                        parseInt(totalMampuesto12['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto12['2 Ductos'].valor =
                        parseInt(totalMampuesto12['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto12['3 Ductos'].valor =
                        parseInt(totalMampuesto12['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto12['Mixto'].valor =
                        parseInt(totalMampuesto12['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto12['Macho'].valor =
                        parseInt(totalMampuesto12['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto12['Hembra'].valor =
                        parseInt(totalMampuesto12['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto12['Maestra'].valor =
                        parseInt(totalMampuesto12['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }
                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto12['Maestra Nueva'].valor =
                        parseInt(totalMampuesto12['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo12.push(agregar);
            }
        });

        this.dataTable2.forEach((element) => {
            if (element.TIPO.valor === 'Mampuestos 12 Con Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Con Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto12['1 Ducto'].valor =
                        parseInt(totalMampuesto12['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto12['2 Ductos'].valor =
                        parseInt(totalMampuesto12['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto12['3 Ductos'].valor =
                        parseInt(totalMampuesto12['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto12['Mixto'].valor =
                        parseInt(totalMampuesto12['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto12['Macho'].valor =
                        parseInt(totalMampuesto12['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto12['Hembra'].valor =
                        parseInt(totalMampuesto12['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto12['Maestra'].valor =
                        parseInt(totalMampuesto12['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto12['Maestra Nueva'].valor =
                        parseInt(totalMampuesto12['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }

                nuevo12.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 20 Con Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Con Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }
                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo20.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 12 Sin Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo20.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 20 Sin Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Antiguo';
                agregar['3 Ductos'] = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo20.push(agregar);
            }
        });

        this.dataTable3.forEach((element) => {
            if (element.TIPO.valor === 'Mampuestos 12 Sin Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Nuevo';
                agregar.Hembra = { orificios: '', valor: '-' };
                agregar.Macho = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto12['1 Ducto'].valor =
                        parseInt(totalMampuesto12['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto12['2 Ductos'].valor =
                        parseInt(totalMampuesto12['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto12['3 Ductos'].valor =
                        parseInt(totalMampuesto12['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto12['Mixto'].valor =
                        parseInt(totalMampuesto12['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto12['Macho'].valor =
                        parseInt(totalMampuesto12['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto12['Hembra'].valor =
                        parseInt(totalMampuesto12['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto12['Maestra'].valor =
                        parseInt(totalMampuesto12['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto12['Maestra Nueva'].valor =
                        parseInt(totalMampuesto12['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo12.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 20 Sin Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Sin Bisel Nuevo';
                agregar.Hembra = { orificios: '', valor: '-' };
                agregar.Macho = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo20.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 12 Con Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Con Bisel Nuevo';
                agregar.Hembra = { orificios: '', valor: '-' };
                agregar.Macho = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto12['1 Ducto'].valor =
                        parseInt(totalMampuesto12['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto12['2 Ductos'].valor =
                        parseInt(totalMampuesto12['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto12['3 Ductos'].valor =
                        parseInt(totalMampuesto12['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto12['Mixto'].valor =
                        parseInt(totalMampuesto12['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto12['Macho'].valor =
                        parseInt(totalMampuesto12['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto12['Hembra'].valor =
                        parseInt(totalMampuesto12['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto12['Maestra'].valor =
                        parseInt(totalMampuesto12['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }

                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto12['Maestra Nueva'].valor =
                        parseInt(totalMampuesto12['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo12.push(agregar);
            } else if (element.TIPO.valor === 'Mampuestos 20 Con Bisel') {
                let agregar: any = element;
                agregar.TIPO.valor = 'Con Bisel Nuevo';
                agregar.Hembra = { orificios: '', valor: '-' };
                agregar.Macho = { orificios: '', valor: '-' };
                if (agregar['1 Ducto'].valor !== '-') {
                    totalMampuesto20['1 Ducto'].valor =
                        parseInt(totalMampuesto20['1 Ducto'].valor) +
                        parseInt(agregar['1 Ducto'].valor);
                }

                if (agregar['2 Ductos'].valor !== '-') {
                    totalMampuesto20['2 Ductos'].valor =
                        parseInt(totalMampuesto20['2 Ductos'].valor) +
                        parseInt(agregar['2 Ductos'].valor);
                }

                if (agregar['3 Ductos'].valor !== '-') {
                    totalMampuesto20['3 Ductos'].valor =
                        parseInt(totalMampuesto20['3 Ductos'].valor) +
                        parseInt(agregar['3 Ductos'].valor);
                }

                if (agregar['Mixto'].valor !== '-') {
                    totalMampuesto20['Mixto'].valor =
                        parseInt(totalMampuesto20['Mixto'].valor) +
                        parseInt(agregar['Mixto'].valor);
                }

                if (agregar['Macho'].valor !== '-') {
                    totalMampuesto20['Macho'].valor =
                        parseInt(totalMampuesto20['Macho'].valor) +
                        parseInt(agregar['Macho'].valor);
                }

                if (agregar['Hembra'].valor !== '-') {
                    totalMampuesto20['Hembra'].valor =
                        parseInt(totalMampuesto20['Hembra'].valor) +
                        parseInt(agregar['Hembra'].valor);
                }

                if (agregar['Maestra'].valor !== '-') {
                    totalMampuesto20['Maestra'].valor =
                        parseInt(totalMampuesto20['Maestra'].valor) +
                        parseInt(agregar['Maestra'].valor);
                }
                if (agregar['Maestra Nueva'].valor !== '-') {
                    totalMampuesto20['Maestra Nueva'].valor =
                        parseInt(totalMampuesto20['Maestra Nueva'].valor) +
                        parseInt(agregar['Maestra Nueva'].valor);
                }
                nuevo20.push(agregar);
            }
        });

        console.log('DATA1', this.dataTable);
        console.log('DATA2', this.dataTable2);
        console.log('DATA3', this.dataTable3);
        nuevo12.push(totalMampuesto12);
        nuevo20.push(totalMampuesto20);
        this.dataTable12 = nuevo12;
        this.dataTable20 = nuevo20;
        console.log('DATAAA1', nuevo12);

        console.log('DATAAA2', nuevo20);

        //this.cargarDatosStock()

        this._changeDetectorRef.markForCheck();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.crearFormGroup = this.formBuilder.group({
            fechaInicio: new FormControl(''),
            fechaFin: new FormControl(''),
        });
        this.cargarDatosStock();
        this.cargarDatosMamposteria();
        this.cargaDataDinteles();
        this.actualizarMeses()
        this.mesesNombre
        this.displayedColumnsMorterosTabla = ['name', ...this.mesesNombre]
        this.updateTablaMorteros(this.TablaMorteros)
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

    updateTablaMorteros(nuevosDatos: any[]) {
      this.dataSourceMorteros$ = new MatTableDataSource(nuevosDatos)
      this.dataSourceMorteros$.paginator = this.paginator
      this.cd.detectChanges()
    }

    getDataForMonth(data: number[], monthIndex: number): number {
      return data[monthIndex] !== undefined ? data[monthIndex] : 0
    }

    async getStockGraficas() {
        let cabeceras = [];
        let cabeceras3 = [];
        this.stockService
            .findAllStockReal('Mampuesto Estructural')
            .subscribe(async (data) => {
                console.log('Data Graficas', data);
                this.dataStockBoonker = [];
                for (var key in data) {
                    let titulo = 'Mampuestos ';
                    titulo = titulo + '' + key;
                    for (var key2 in data[key]) {
                        let nombre = '';
                        if (key2 !== '') {
                            nombre = key2;
                        } else {
                            key2 = 'S/N';
                            nombre = 'S/N';
                        }
                        const respuesta = cabeceras.find(
                            (element) => element === nombre
                        );
                        // console.log('CABECERASSS:', respuesta);

                        for (var key3 in data[key][key2]) {
                            const titulo2 = key3;
                            const tituloNuevo = titulo + ' ' + titulo2;
                            const resultado = this.dataStockBoonker.find(
                                (fruta) => fruta.titulo === tituloNuevo
                            );
                            if (resultado === undefined) {
                                this.dataStockBoonker.push({
                                    titulo: tituloNuevo,
                                    data: [],
                                    total: 0,
                                });
                            }
                            for (var key4 in data[key][key2][key3]) {
                                let existe = 'Mampuestos ' + key + ' ' + key3;
                                const resultado = this.dataStockBoonker.find(
                                    (fruta) => fruta.titulo === existe
                                );
                                const nombre2 = key4;

                                resultado.data.push({
                                    nombre: nombre,
                                    nombre2: nombre2,
                                    valor: data[key][key2][key3][key4],
                                });

                                resultado.total =
                                    resultado.total +
                                    data[key][key2][key3][key4];
                            }
                        }
                    }
                }
                await this.cargarTabla();
                // console.log('FIn', this.dataStockBoonker);
                // console.log('FIn', cabeceras);
                this._changeDetectorRef.markForCheck();
            });
        this._changeDetectorRef.markForCheck();

    }

    async getStockGraficasMorteros() {
        let cabecerasMorteros = [];
        this.stockService
            .findAllStockReal('Morteros')
            .subscribe(async (data) => {
                // console.log('Data Graficas Morteros', data);
                this.dataStockMorteros = [];
                for (var key in data) {
                    let titulo = 'Morteros ';
                    titulo = titulo;
                    for (var key2 in data[key]) {
                        const nombre = key2;
                        for (var key3 in data[key][key2]) {
                            const titulo2 = key3;
                            const tituloNuevo = titulo + ' ' + titulo2;
                            const resultado = this.dataStockMorteros.find(
                                (fruta) => fruta.titulo === tituloNuevo
                            );
                            if (resultado === undefined) {
                                this.dataStockMorteros.push({
                                    titulo: tituloNuevo,
                                    data: [],
                                    total: 0,
                                });
                            }
                            for (var key4 in data[key][key2][key3]) {
                                let existe = 'Morteros ' + ' ' + key3;
                                const resultado = this.dataStockMorteros.find(
                                    (fruta) => fruta.titulo === existe
                                );
                                const nombre2 = key4;

                                const respuesta = cabecerasMorteros.find(
                                    (element) => element === nombre2
                                );

                                resultado.data.push({
                                    nombre: nombre,
                                    nombre2: nombre2,
                                    valor: data[key][key2][key3][key4],
                                });

                                resultado.total =
                                    resultado.total +
                                    data[key][key2][key3][key4];
                            }
                        }
                    }
                }
                this.cargarTablaMorteros();
                // console.log('FIn Morteros', this.dataStockMorteros);
                this._changeDetectorRef.markForCheck();
            });
        this._changeDetectorRef.markForCheck();
    }

    // filtrarPorMes(mes) {
    //     this.filtroFN = mes
    //     this.cargarDatosStock()
    // }

    // filtrarPorMesMamposteria12(mes) {
    //     this.filtroMamposteria12 = mes
    //     this.cargarDatosMamposteria()
    // }

    // filtrarPorMesMamposteria20(mes) {
    //     this.filtroMamposteria20 = mes
    //     this.cargarDatosMamposteria()
    // }

    

    mesString(mes) {
        if(mes === '01') {
            return 'Enero'
        }else if(mes === '02') {
            return 'Febrero'
        }else if(mes === '03') {
            return 'Marzo'
        }else if(mes === '04') {
            return 'Abril'
        }else if(mes === ('05' || '5')) {
            return 'Mayo'
        }else if(mes === '06') {
            return 'Junio'
        }else if(mes === '07') {
            return 'Julio'
        }else if(mes === '08') {
            return 'Agosto'
        }else if(mes === '09') {
            return 'Septiembre'
        }else if(mes === '10') {
            return 'Octubre'
        }else if(mes === '11') {
            return 'Noviembre'
        }else if(mes === '12'){
            return 'Diciembre'
        }else {
            return '(Sin Registro de datos)'
        }
    }

    filtroMesDiaMortero(data, fechaInicio, fechaFin) {
      
      console.log('inicio1 => ', new Date(fechaInicio.setDate(fechaInicio.getDate() + 1)))
      const inicialF = new Date(fechaInicio.setDate(fechaInicio.getDate() + 1))
      console.log('fin1 => ', new Date(fechaFin.setDate(fechaFin.getDate() + 1)))
      const finalF = new Date(fechaFin.setDate(fechaFin.getDate() + 1))
      const datosFiltradosMortero = {}
      for (const tipo in data) {
        if (data.hasOwnProperty(tipo)) {
          for (const subtipo in data[tipo]) {
            if (data[tipo].hasOwnProperty(subtipo)) {
              for (const mes in data[tipo][subtipo]) {
                if (data[tipo][subtipo].hasOwnProperty(mes)) {
                  for (const dia in data[tipo][subtipo][mes]) {
                    if (data[tipo][subtipo][mes].hasOwnProperty(dia)) {
                      const fechaCompleta = new Date(2024, parseInt(mes) - 1, parseInt(dia))
                      console.log('fecha utilizada => ', fechaCompleta)
                      if (fechaCompleta >= inicialF && fechaCompleta <= finalF) {
                        if (!datosFiltradosMortero[tipo]) {
                          datosFiltradosMortero[tipo] = {}
                        }
                        if (!datosFiltradosMortero[tipo][subtipo]) {
                          datosFiltradosMortero[tipo][subtipo] = {}
                        }
                        if (!datosFiltradosMortero[tipo][subtipo][mes]) {
                          datosFiltradosMortero[tipo][subtipo][mes] = {}
                        }
                        datosFiltradosMortero[tipo][subtipo][mes][dia] = data[tipo][subtipo][mes][dia]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    
      function eliminarEntradasVacias(obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              eliminarEntradasVacias(obj[key])
              if (Object.keys(obj[key]).length === 0) {
                delete obj[key]
              }
            }
          }
        }
      }
    
      eliminarEntradasVacias(datosFiltradosMortero)

      const todosLosMeses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
      //const fechaInicial = new Date(fechaInicio.setDate(fechaInicio.getDate() + 1))
      const mesInicial = inicialF.getMonth()
      console.log('mesInicial 2=>  ',mesInicial)
      //const fechaFinal = new Date(fechaFin.setDate(fechaFin.getDate() + 1))
      const mesFinal = finalF.getMonth() - 1
      console.log('mesFinal 2=> ',mesFinal)

      let rangoMeses
      if (mesInicial === mesFinal) {
          rangoMeses = [todosLosMeses[mesInicial]]
      } else {
          rangoMeses = todosLosMeses.slice(mesInicial, mesFinal + 1)
      }
      console.log('rango meses ', rangoMeses)
      for(const tipo in datosFiltradosMortero) {
        if(datosFiltradosMortero.hasOwnProperty(tipo)) {
          for(const subtipo in datosFiltradosMortero[tipo]) {
            if(datosFiltradosMortero[tipo].hasOwnProperty(subtipo)) {
              for (let mes of rangoMeses) {
                if (!datosFiltradosMortero[tipo][subtipo][mes]) {
                  datosFiltradosMortero[tipo][subtipo][mes] = 0
                }
              }
            }
          }
        }
      }
      console.log('datos Mortero filtrados ', datosFiltradosMortero)
      return datosFiltradosMortero
    }

    cargarDatosStock() {
        this.stockService.findAllStock('Morteros').subscribe((data) => {
            //console.log('stock morteros ', data[0].Morteros)
            this.morteros = data[0].Morteros;
            //fechas
            const fechaInicio = new Date(this.fechaInicio)
            const fechaFin = new Date(this.fechaFin)

            let morteroFiltrado = this.filtroMesDiaMortero(this.morteros, fechaInicio, fechaFin)
            //console.log('mortero filtrado ', this.filtroMesDiaMortero(this.morteros, fechaInicio, fechaFin))
            const resultado = []
            for (const tipo in morteroFiltrado) {
              //console.log(tipo)
              if (morteroFiltrado.hasOwnProperty(tipo)) {
                resultado[tipo] = {}
                //console.log('resultado => ', resultado[tipo])
                for (const subTipo in morteroFiltrado[tipo]) {
                  if (morteroFiltrado[tipo].hasOwnProperty(subTipo)) {
                    resultado[tipo][subTipo] = {}
                    for (const mes in morteroFiltrado[tipo][subTipo]) {
                      if (morteroFiltrado[tipo][subTipo].hasOwnProperty(mes)) {
                        let sumaMes = 0
                        for (const dia in morteroFiltrado[tipo][subTipo][mes]) {
                            if (morteroFiltrado[tipo][subTipo][mes].hasOwnProperty(dia)) {
                                sumaMes += morteroFiltrado[tipo][subTipo][mes][dia]
                            }
                        }
                        resultado[tipo][subTipo][mes] = sumaMes
                      }
                    }
                  }
                }
              }
            }
            //console.log('suma mensual mortero ',resultado)
            this.sumasMensuales = resultado
            

            //datos separados mortero fn
            const resultado1 = {};
            const data1 = resultado['FN']
            //console.log('data FN ', data1)
            for (const subtipo in data1) {
                for (const mes in data1[subtipo]) {
                  if (!resultado1[mes]) {
                    resultado1[mes] = []
                  }
                  resultado1[mes].push(data1[subtipo][mes])
                }
            }
            for (const mes in resultado1) {
              resultado1[mes] = [resultado1[mes].reduce((total, value) => total + value, 0)]
            }
            const entriesFN = Object.entries(resultado1)
            const ordenadoFN = entriesFN.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoFN = Object.fromEntries(ordenadoFN)
            const dataArray = Object.keys(resultadoFN).map(mes => resultado1[mes][0])
            let dartosMorteros = [{
              name: 'Grout Nivelación',
              data: dataArray
            }]
            

            //mortero DK
            const resultado2 = {};
            const data2 = resultado['DK']
            //console.log('DK filtrada ',data2)
            for (const tipo in data2) {
                for (const mes in data2[tipo]) {
                    if (!resultado2[mes]) {
                        resultado2[mes] = [];
                    }
                    resultado2[mes].push(data2[tipo][mes]);
                }
            }
            for (const mes in resultado2) {
              resultado2[mes] = [resultado2[mes].reduce((total, value) => total + value, 0)]
            }
            //console.log('DK ', resultado2)
            const entriesDK = Object.entries(resultado2)
            const ordenadoDK = entriesDK.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoDK = Object.fromEntries(ordenadoDK)
            const dataArrayDK = Object.keys(resultadoDK).map(mes => resultado2[mes][0])
            //console.log('ordenado ',dataArrayDK)
            dartosMorteros.push({
              name: 'Mortero DK',
              data: dataArrayDK
            })

            //mortero GE
            const resultado3 = {};
            const data3 = resultado['GE']
            //console.log('data GE ', data3)
            for (const tipo in data3) {
                for (const mes in data3[tipo]) {
                    if (!resultado3[mes]) {
                        resultado3[mes] = [];
                    }
                    resultado3[mes].push(data3[tipo][mes]);
                }
            }

            for (const mes in resultado3) {
              resultado3[mes] = [resultado3[mes].reduce((total, value) => total + value, 0)]
            }
            const entriesGE = Object.entries(resultado3)
            const ordenadoGE = entriesGE.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoGE = Object.fromEntries(ordenadoGE)
            const dataArrayGE = Object.keys(resultadoGE).map(mes => resultado3[mes][0])
            dartosMorteros.push({
              name: 'Grout Estandar',
              data: dataArrayGE
            })

            //mortero GP
            const resultado4 = {};
            const data4 = resultado['GP']
            for (const tipo in data4) {
                for (const mes in data4[tipo]) {
                    if (!resultado4[mes]) {
                        resultado4[mes] = [];
                    }
                    resultado4[mes].push(data4[tipo][mes]);
                }
            }

            for (const mes in resultado4) {
              resultado4[mes] = [resultado4[mes].reduce((total, value) => total + value, 0)]
            }
            const entriesGP = Object.entries(resultado4)
            const ordenadoGP = entriesGP.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoGP = Object.fromEntries(ordenadoGP)
            const dataArrayGP = Object.keys(resultadoGP).map(mes => resultado4[mes][0])
            dartosMorteros.push({
              name: 'Grout Plus',
              data: dataArrayGP
            })

            //mortero NV
            const resultado5 = {}
            const data5 = resultado['NV']
            console.log('nv ', data5)
            for (const tipo in data5) {
                for (const mes in data5[tipo]) {
                    if (!resultado5[mes]) {
                        resultado5[mes] = [];
                    }
                    resultado5[mes].push(data5[tipo][mes]);
                }
            }
            for (const mes in resultado5) {
              resultado5[mes] = [resultado5[mes].reduce((total, value) => total + value, 0)]
            }
            const entries = Object.entries(resultado5)
            const ordenadoNv = entries.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoNv = Object.fromEntries(ordenadoNv)
            const dataArrayNV = Object.keys(resultadoNv).map(mes => resultado5[mes][0])
            dartosMorteros.push({
              name: 'Mortero NV',
              data: dataArrayNV
            })
            //mortero SE
            const resultado6 = {};
            const data6 = resultado['SE']
            for (const tipo in data6) {
                for (const mes in data6[tipo]) {
                    if (!resultado6[mes]) {
                        resultado6[mes] = [];
                    }
                    resultado6[mes].push(data6[tipo][mes]);
                }
            }

            for (const mes in resultado6) {
              resultado6[mes] = [resultado6[mes].reduce((total, value) => total + value, 0)]
            }
            const entriesSE = Object.entries(resultado4)
            const ordenadoSE = entriesSE.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            const resultadoSE = Object.fromEntries(ordenadoSE)
            const dataArraySE = Object.keys(resultadoSE).map(mes => resultado6[mes][0])
            dartosMorteros.push({
              name: 'Seal Estandar',
              data: dataArraySE
            })
            console.log('datos morteros ', dartosMorteros)
            this.TablaMorteros = dartosMorteros
            this.updateTablaMorteros(this.TablaMorteros)
            // this.dataSourceMorteros$ = new MatTableDataSource(this.TablaMorteros)
            // this.dataSourceMorteros$.paginator = this.paginator
            const graficaPie = dartosMorteros
            const sumaMesesPie = graficaPie.map(serie => serie.data.reduce((total, value) => total + value, 0))
            //console.log('grafica pie ', sumaMesesPie)
            this.groutNivelacion = sumaMesesPie[0] || 0
            this.morteroDK = sumaMesesPie[1]
            this.groutEstandar = sumaMesesPie[2]
            this.groutPlus = sumaMesesPie[3]
            this.morteroNV = sumaMesesPie[4]
            this.sealEstandar = sumaMesesPie[5]
            const sumaDataMes = sumaMesesPie.reduce((total, value) => total + value, 0)
            const porcentajeDatosPie = sumaMesesPie.map(value => +((value * 100) / sumaDataMes).toFixed(2)) || []

            //carga de datos grafica barras
            this.morterosOptions = {
                series: dartosMorteros,
                chart: {
                  type: "bar",
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "55%"
                  }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                      return val.toString();
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "18px",
                      colors: ["#000000"]
                    }
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"]
                },
                xaxis: {
                  categories: this.mesesNombre
                },
                yaxis: {
                  title: {
                    text: "Unidades"
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function(val) {
                      return val + " Unidades";
                    }
                  }
                },
                title: {
                    text: "Monthly",
                    offsetY: 320,
                    align: "center",
                    style: {
                      color: "#444"
                    }
                }
            };
            //grafico de pastel
            this.morterosOptionsPie = {
              series: porcentajeDatosPie,
              chart: {
                height: 390,
                type: "radialBar"
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: "11%",
                    background: "transparent",
                    image: undefined
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
              colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
              labels: ["Grout Nivelación", "Mortero DK", "Grout Estandar", "Grout Plus", "Mortero NV", "Seal Estandar"],
              legend: {
                show: true,
                floating: true,
                fontSize: "16px",
                position: "left",
                offsetX: 50,
                offsetY: 10,
                labels: {
                  useSeriesColors: true
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] +' %';
                },
                itemMargin: {
                  horizontal: 3
                }
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: false
                    }
                  }
                }
              ]
            };
            //     series: dartosMorteros,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [
            //         ""
            //       ]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };
            
            // this.morterosOptionsGE = {
            //     series: morteroGE,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [
            //         ""
            //       ]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.morterosOptionsGP = {
            //     series: morteroGP,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [
            //         ""
            //       ]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.morterosOptionsNV = {
            //     series: morteroNV,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [
            //         ""
            //       ]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.morterosOptionsSE = {
            //     series: morteroSE,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "16px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [
            //         ""
            //       ]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };
            this.cd.detectChanges();
        });
    }

    filtrarMesDiaMampuesto(data, fechaInicio, fechaFin) {
      console.log('fechaInicio ', fechaInicio)
      console.log('fechaFin ', fechaFin)
      console.log('data ', data)

      const inicialFM = new Date(fechaInicio.setDate(fechaInicio.getDate() + 1))
      const finFM = new Date(fechaFin.setDate(fechaFin.getDate() + 1))

      const datosFiltradosMampuesto = {}
      for (const tipo in data) {
        if (data.hasOwnProperty(tipo)) {
            for (const subtipo in data[tipo]) {
                if (data[tipo].hasOwnProperty(subtipo)) {
                    for (const bisel in data[tipo][subtipo]) {
                        if (data[tipo][subtipo].hasOwnProperty(bisel)) {
                            for (const orificio in data[tipo][subtipo][bisel]) {
                                if (data[tipo][subtipo][bisel].hasOwnProperty(orificio)) {
                                    for (const mes in data[tipo][subtipo][bisel][orificio]) {
                                        if (data[tipo][subtipo][bisel][orificio].hasOwnProperty(mes)) {
                                            for (const dia in data[tipo][subtipo][bisel][orificio][mes]) {
                                                if (data[tipo][subtipo][bisel][orificio][mes].hasOwnProperty(dia)) {
                                                    const fechaCompleta = new Date(2024, parseInt(mes) - 1, parseInt(dia));
                                                    if (fechaCompleta >= inicialFM && fechaCompleta <= finFM) {
                                                        if (!datosFiltradosMampuesto[tipo]) {
                                                            datosFiltradosMampuesto[tipo] = {};
                                                        }
                                                        if (!datosFiltradosMampuesto[tipo][subtipo]) {
                                                            datosFiltradosMampuesto[tipo][subtipo] = {};
                                                        }
                                                        if (!datosFiltradosMampuesto[tipo][subtipo][bisel]) {
                                                            datosFiltradosMampuesto[tipo][subtipo][bisel] = {};
                                                        }
                                                        if (!datosFiltradosMampuesto[tipo][subtipo][bisel][orificio]) {
                                                            datosFiltradosMampuesto[tipo][subtipo][bisel][orificio] = {};
                                                        }
                                                        if (!datosFiltradosMampuesto[tipo][subtipo][bisel][orificio][mes]) {
                                                            datosFiltradosMampuesto[tipo][subtipo][bisel][orificio][mes] = {};
                                                        }
                                                        datosFiltradosMampuesto[tipo][subtipo][bisel][orificio][mes][dia] = data[tipo][subtipo][bisel][orificio][mes][dia];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
      }

      function eliminarEntradasVacias(obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              eliminarEntradasVacias(obj[key])
              if (Object.keys(obj[key]).length === 0) {
                delete obj[key]
              }
            }
          }
        }
      }
    
      eliminarEntradasVacias(datosFiltradosMampuesto)

      //agregar meses faltantes con valor cero entre los meses de busqueda 
      const todosLosMeses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
      const mesInicial = inicialFM.getMonth()
      const mesFinal = finFM.getMonth() - 1
      const rangoMeses = todosLosMeses.slice(mesInicial, mesFinal + 2)
      console.log('rango meses ', rangoMeses)
      for(const tipo in datosFiltradosMampuesto) {
        if(datosFiltradosMampuesto.hasOwnProperty(tipo)) {
          for(const subtipo in datosFiltradosMampuesto[tipo]) {
            if(datosFiltradosMampuesto[tipo].hasOwnProperty(subtipo)) {
              for(const bisel in datosFiltradosMampuesto[tipo][subtipo]) {
                if(datosFiltradosMampuesto[tipo][subtipo].hasOwnProperty(bisel)) {
                  for(const orificio in datosFiltradosMampuesto[tipo][subtipo][bisel]) {
                    if(datosFiltradosMampuesto[tipo][subtipo][bisel].hasOwnProperty(orificio)) {
                      for (let mes of rangoMeses) {
                        if (!datosFiltradosMampuesto[tipo][subtipo][bisel][orificio][mes]) {
                          datosFiltradosMampuesto[tipo][subtipo][bisel][orificio][mes] = 0
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      function ordenarMeses(obj) {
        if (typeof obj !== 'object' || obj === null) return obj
        const orderedObj = {}
        Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b)).forEach(key => {
            orderedObj[key] = ordenarMeses(obj[key])
        })
        return orderedObj
      }
      // console.log('datos filtrados morteros ', ordenarMeses(datosFiltradosMampuesto))
      const datosFiltradosOrdenados = ordenarMeses(datosFiltradosMampuesto)
      console.log('datos mampuesto estructural ', datosFiltradosOrdenados)
      return datosFiltradosOrdenados
    }

    cargarDatosMamposteria() {
        this.stockService.findAllStock('Mampuesto Estructural').subscribe(data => {
            //fechas
            const fechaInicio = new Date(this.fechaInicio)
            const fechaFin = new Date(this.fechaFin)
            const dataFiltradaMampuesto = this.filtrarMesDiaMampuesto(data, fechaInicio, fechaFin)
            //console.log('data filtrada mampuesto ', dataFiltradaMampuesto)

            let mamposteria12 = dataFiltradaMampuesto[12]
            let mamposteria20 = dataFiltradaMampuesto[20]

            const resultado1 = {}

            for(const data1 in mamposteria12) {
                resultado1[data1] = {}
                for(const data2 in mamposteria12[data1]){
                    resultado1[data1][data2] = {}
                    for(const data3 in mamposteria12[data1][data2]){
                        resultado1[data1][data2][data3] = {}
                        for(const data4 in mamposteria12[data1][data2][data3]){
                            let sumaMes = 0
                            for(const data5 in mamposteria12[data1][data2][data3][data4]) {
                                //console.log('valores => ', data5)
                                sumaMes += mamposteria12[data1][data2][data3][data4][data5]
                            }
                            resultado1[data1][data2][data3][data4] = sumaMes
                        }
                    }
                }
            }
            //console.log('suma mamposteria12 ', resultado1)

            //mamposteria 6
            const resultado6 = [];
            const data1 = resultado1['6']
            //console.log('mamposteria 6 ', data1)
            for (const tipo in data1) {
              for(const subtipo in data1[tipo]){
                for(const mes in data1[tipo][subtipo]) {
                  if(!resultado6[mes]) {
                    resultado6[mes] = []
                  }
                  resultado6[mes].push(data1[tipo][subtipo][mes])
                }
              }
            }
            //console.log('RESULTADO ',resultado6)
            const sinBicel = Object.values(resultado6).map(item => item[0])
            let mamposteriaGeneral = [{
              name: '6 Sin Bicel',
              data: sinBicel
            }]
            //console.log('sin bicel', mamposteriaGeneral)
            
            //Doble
            const resultadoDoble = []
            const data2 = resultado1['Doble']
            //console.log('Doble ', data2)
            for (const tipo in data2) {
                for(const subtipo in data2[tipo]){
                    for(const mes in data2[tipo][subtipo]) {
                      if(!resultadoDoble[mes]) {
                        resultadoDoble[mes] = []
                      }
                      resultadoDoble[mes].push(data2[tipo][subtipo][mes])

                    }
                }
            }
            
            const sinBicelDoble = Object.values(resultadoDoble).map(item => item.reduce((total, value) => total + value, 0))
            //console.log('RESULTADO doble', sinBicelDoble)
            mamposteriaGeneral.push({
              name: 'Doble Sin Bicel',
              data: sinBicelDoble
            })

            //H/M
            const resultadoHM = []
            const data3 = resultado1['H/M']
            for (const tipo in data3) {
                for(const subtipo in data3[tipo]){
                    for(const mes in data3[tipo][subtipo]) {
                        if(!resultadoHM[mes]) {
                            resultadoHM[mes] = []
                        }
                        resultadoHM[mes].push(data3[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoHM)
            const sinBicelHM = Object.values(resultadoHM).map(item => item[0])
            mamposteriaGeneral.push({
              name: 'H/M Sin Bicel',
              data: sinBicelHM
            })
            
            //Hembra
            const resultadoHembra = []
            const data4 = resultado1['Hembra']
            for (const tipo in data4) {
                for(const subtipo in data4[tipo]){
                    for(const mes in data4[tipo][subtipo]) {
                        if(!resultadoHembra[mes]) {
                            resultadoHembra[mes] = []
                        }
                        resultadoHembra[mes].push(data4[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoHembra)
            const sinBicelHembra = Object.values(resultadoHembra).map(item => item[0])
            mamposteriaGeneral.push({
              name: 'Hembra Sin Bicel',
              data: sinBicelHembra
            })
            
            //Macho
            const resultadoMacho = []
            const data5 = resultado1['Macho']
            for (const tipo in data5) {
                for(const subtipo in data5[tipo]){
                    for(const mes in data5[tipo][subtipo]) {
                        if(!resultadoMacho[mes]) {
                            resultadoMacho[mes] = []
                        }
                        resultadoMacho[mes].push(data5[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMacho)
            const sinBicelMacho = Object.values(resultadoMacho).map(item => item[0])
            mamposteriaGeneral.push({
              name: 'Macho Con Bicel',
              data: sinBicelMacho
            })

            //Maestra
            const resultadoMaestra = []
            const data6 = resultado1['Maestra']
            for (const tipo in data6) {
                for(const subtipo in data6[tipo]){
                    for(const mes in data6[tipo][subtipo]) {
                        if(!resultadoMaestra[mes]) {
                            resultadoMaestra[mes] = []
                        }
                        resultadoMaestra[mes].push(data6[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMaestra)
            const sinBicelMaestra = Object.values(resultadoMaestra).map(item => item[0])
            const conBicelMaestra = Object.values(resultadoMaestra).map(item => item[1])
            if(!Object.values(conBicelMaestra).includes(undefined)) {
              mamposteriaGeneral.push(
                {
                  name: 'Maestra Con Bicel',
                  data: conBicelMaestra
                }
              )
            }else {
              mamposteriaGeneral.push(
                {
                  name: 'Maestra Con Bicel',
                  data: [0]
                }
              )
            }
            mamposteriaGeneral.push(
              {
              name: 'Maestra Sin Bicel',
              data: sinBicelMaestra
              }
            )
            
            //Maestra Nueva
            const resultadoMaestraNueva = []
            const data7 = resultado1['Maestra Nueva']
            for (const tipo in data7) {
                for(const subtipo in data7[tipo]){
                    for(const mes in data7[tipo][subtipo]) {
                        if(!resultadoMaestraNueva[mes]) {
                            resultadoMaestraNueva[mes] = []
                        }
                        resultadoMaestraNueva[mes].push(data7[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMaestraNueva)
            const sinBicelMaestraNueva = Object.values(resultadoMaestraNueva).map(item => item[0])
            mamposteriaGeneral.push({
              name: 'Maestra Nueva Sin Bicel',
              data: sinBicelMaestraNueva
            })

            //Mixto
            const resultadoMixto = []
            const data8 = resultado1['Mixto']
            //console.log('mixto ', data8)
            for (const tipo in data8) {
                for(const subtipo in data8[tipo]){
                    for(const mes in data8[tipo][subtipo]) {
                        if(!resultadoMixto[mes]) {
                            resultadoMixto[mes] = []
                        }
                        resultadoMixto[mes].push(data8[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMixto)
            const sinBicelMixto = Object.values(resultadoMixto).map(item => item[0])
            const conBicelMixto = Object.values(resultadoMixto).map(item => item[1])
            if(!Object.values(conBicelMixto).includes(undefined)) {
              mamposteriaGeneral.push(
                {
                  name: 'Mixto Con Bicel',
                  data: conBicelMixto
                }
              )
            }else {
              mamposteriaGeneral.push(
                {
                  name: 'Mixto Con Bicel',
                  data: [0]
                }
              )
            }
            mamposteriaGeneral.push(
              {
              name: 'Mixto Sin Bicel',
              data: sinBicelMixto
              }
            )
            //console.log('mamposteria 12 ',mamposteriaGeneral)
            const copiaDatosMamposteria = mamposteriaGeneral
            this.mamposteria12 = mamposteriaGeneral
            const sumaDatosMamposteria = copiaDatosMamposteria.map(item => item.data.reduce((total, value) => total + value, 0))
            const totalMeses = sumaDatosMamposteria.reduce((total, value) => total + value, 0)
            const porcentajeMamposteria = sumaDatosMamposteria.map(value => +((value * 100) / totalMeses).toFixed(2))
            //console.log('valores sumados mam ', porcentajeMamposteria)
            this.sinBicel6 = sumaDatosMamposteria[0]
            this.dobleSin = sumaDatosMamposteria[1]
            this.HMSin = sumaDatosMamposteria[2]
            this.HembraSin = sumaDatosMamposteria[3]
            this.machoCon = sumaDatosMamposteria[4]
            this.maestraCon = sumaDatosMamposteria[5]
            this.maestraSin = sumaDatosMamposteria[6]
            this.maestraNuevaSin = sumaDatosMamposteria[7]
            this.mixtoCon = sumaDatosMamposteria[8]
            this.mixtoaSin = sumaDatosMamposteria[9]
            //data graficos mamposteria 12
            this.momposteroOption6 = {
                series: mamposteriaGeneral,
                chart: {
                  type: "bar",
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "75%"
                  }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                      return val.toString();
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "14px",
                      colors: ["#000000"]
                    }
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"]
                },
                xaxis: {
                  categories: this.mesesNombre
                },
                yaxis: {
                  title: {
                    text: "Unidades"
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function(val) {
                      return val + " Unidades";
                    }
                  }
                }
            };
            //grafico Circle
            this.chartOptionsCircleMamposteria12 = {
              series: porcentajeMamposteria,
              chart: {
                height: 500,
                type: "radialBar"
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: "2%",
                    background: "transparent",
                    image: undefined
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
              colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
              labels: ["6 SB", "Doble SB", "Hembra/Macho SB", "Hembra SB", "Macho SB", "Maestra CB", "Maestra SB", "Maestra Nueva SB", "Mixto CB", "Mixto SB"],
              legend: {
                show: true,
                floating: true,
                fontSize: "15px",
                position: "left",
                offsetX: 15,
                offsetY: 5,
                labels: {
                  useSeriesColors: true
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]+'%';
                },
                itemMargin: {
                  horizontal: 3
                }
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: false
                    }
                  }
                }
              ]
            };

            // this.momposteroOptionDoble = {
            //     series: mampuestoDoble,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionHM = {
            //     series: mampuestoHM,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionHembra = {
            //     series: mampuestoHembra,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionMacho = {
            //     series: mampuestoMacho,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionMaestra = {
            //     series: mampuestoMaestra,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionMaestraNueva = {
            //     series: mampuestoMaestraNueva,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            // this.momposteroOptionMixto = {
            //     series: mampuestoMixto,
            //     chart: {
            //       type: "bar",
            //       height: 350
            //     },
            //     plotOptions: {
            //       bar: {
            //         horizontal: false,
            //         columnWidth: "55%"
            //       }
            //     },
            //     dataLabels: {
            //         enabled: true,
            //         formatter: function(val) {
            //           return val.toString();
            //         },
            //         offsetY: -20,
            //         style: {
            //           fontSize: "18px",
            //           colors: ["#000000"]
            //         }
            //     },
            //     stroke: {
            //       show: true,
            //       width: 2,
            //       colors: ["transparent"]
            //     },
            //     xaxis: {
            //       categories: [""]
            //     },
            //     yaxis: {
            //       title: {
            //         text: "Unidades"
            //       }
            //     },
            //     fill: {
            //       opacity: 1
            //     },
            //     tooltip: {
            //       y: {
            //         formatter: function(val) {
            //           return val + " Unidades";
            //         }
            //       }
            //     }
            // };

            //tabla 2
            const resultado2 = {}

            for(const data1 in mamposteria20) {
                resultado2[data1] = {}
                for(const data2 in mamposteria20[data1]){
                    resultado2[data1][data2] = {}
                    for(const data3 in mamposteria20[data1][data2]){
                        resultado2[data1][data2][data3] = {}
                        for(const data4 in mamposteria20[data1][data2][data3]){
                            let sumaMes = 0
                            for(const data5 in mamposteria20[data1][data2][data3][data4]) {
                                //console.log('valores => ', data5)
                                sumaMes += mamposteria20[data1][data2][data3][data4][data5]
                                
                            }
                            resultado2[data1][data2][data3][data4] = sumaMes
                        }
                    }
                }
            }
            //console.log('suma mamposteria20 ', resultado2)
            this.sumaMamposteria20 = resultado2 ////resultados tabla 2

            //6
            const resultado620 = []
            const data9 = resultado2['6']
            console.log('6 => ',data9)
            for (const tipo in data9) {
                for(const subtipo in data9[tipo]){
                    for(const mes in data9[tipo][subtipo]) {
                      if(!resultado620[mes]) {
                          resultado620[mes] = []
                      }
                      resultado620[mes].push(data9[tipo][subtipo][mes])
                    }
                }
            }
            console.log('RESULTADO ',resultado620)
            const sinBicel620 = Object.values(resultado620).map(item => item[0])
            const conBicel620 = Object.values(resultado620).map(item => item[1])
            const mamposteriaGeneral20 = []
            if(!Object.values(conBicel620).includes(undefined)) {
              mamposteriaGeneral20.push(
                {
                  name: '6 Con Bicel',
                  data: conBicel620
                }
              )
            }else {
              mamposteriaGeneral20.push(
                {
                  name: '6 Con Bicel',
                  data: []
                }
              )
            }
            mamposteriaGeneral20.push(
              {
              name: '6 Sin Bicel',
              data: sinBicel620
              }
            )
            
            //Doble
            const resultadoDoble20 = []
            const data10 = resultado2['Doble']
            for (const tipo in data10) {
                for(const subtipo in data10[tipo]){
                    for(const mes in data10[tipo][subtipo]) {
                        if(!resultadoDoble20[mes]) {
                            resultadoDoble20[mes] = []
                        }
                        resultadoDoble20[mes].push(data10[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoDoble20)
            const sinBicelDoble20 = Object.values(resultadoDoble20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'Doble Sin Bicel',
              data: sinBicelDoble20
            })
            
            //H/M
            const resultadoHM20 = []
            const data11 = resultado2['H/M']
            for (const tipo in data11) {
                for(const subtipo in data11[tipo]){
                    for(const mes in data11[tipo][subtipo]) {
                        if(!resultadoHM20[mes]) {
                            resultadoHM20[mes] = []
                        }
                        resultadoHM20[mes].push(data11[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoHM20)
            const sinBicelDobleHM20 = Object.values(resultadoHM20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'H/M Sin Bicel',
              data: sinBicelDobleHM20
            })
            
            //Hembra
            const resultadoHembra20 = []
            const data12 = resultado2['Hembra']
            console.log('mamposteria 20 ', data12)
            for (const tipo in data12) {
                for(const subtipo in data12[tipo]){
                    for(const mes in data12[tipo][subtipo]) {
                        if(!resultadoHembra20[mes]) {
                            resultadoHembra20[mes] = []
                        }
                        resultadoHembra20[mes].push(data12[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoHembra20)
            const sinBicelDobleHembra20 = Object.values(resultadoHembra20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'Hembra Sin Bicel',
              data: sinBicelDobleHembra20
            })
            
            //Maestra
            const resultadoMaestra20 = []
            const data13 = resultado2['Maestra']
            for (const tipo in data13) {
                for(const subtipo in data13[tipo]){
                    for(const mes in data13[tipo][subtipo]) {
                        if(!resultadoMaestra20[mes]) {
                            resultadoMaestra20[mes] = []
                        }
                        resultadoMaestra20[mes].push(data13[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMaestra20)
            const sinBicelMaestra20 = Object.values(resultadoMaestra20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'Maestra Sin Bicel',
              data: sinBicelMaestra20
            })

            //Maestra Nueva
            const resultadoMaestraNueva20 = {};
            const data14 = resultado2['Maestra Nueva']
            for (const tipo in data14) {
                for(const subtipo in data14[tipo]){
                    for(const mes in data14[tipo][subtipo]) {
                        if(!resultadoMaestraNueva20[mes]) {
                            resultadoMaestraNueva20[mes] = []
                        }
                        resultadoMaestraNueva20[mes].push(data14[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMaestraNueva20)
            const sinBicelMaestraNueva20 = Object.values(resultadoMaestraNueva20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'Maestra Nueva Sin Bicel',
              data: sinBicelMaestraNueva20
            })
            
            //Mixto
            const resultadoMixto20 = {};
            const data15 = resultado2['Mixto']
            //console.log('mixto 20 ', data15)
            for (const tipo in data15) {
                for(const subtipo in data15[tipo]){
                    for(const mes in data15[tipo][subtipo]) {
                        if(!resultadoMixto20[mes]) {
                            resultadoMixto20[mes] = []
                        }
                        resultadoMixto20[mes].push(data15[tipo][subtipo][mes])

                    }
                }
            }
            //console.log('RESULTADO ',resultadoMixto20)
            const sinBicelMixto20 = Object.values(resultadoMixto20).map(item => item[0])
            mamposteriaGeneral20.push({
              name: 'Mixto Sin Bicel',
              data: sinBicelMixto20
            })
            const copiaDatosMamposteria20 = mamposteriaGeneral20
            this.mamposteria20 = mamposteriaGeneral20
            const sumaDatosMamposteria20 = copiaDatosMamposteria20.map(item => item.data.reduce((total, value) => total + value, 0))
            const totalMeses20 = sumaDatosMamposteria20.reduce((total, value) => total + value, 0)
            const porcentajeMamposteria20 = sumaDatosMamposteria20.map(value => +((value * 100) / totalMeses20).toFixed(2))

            this.CB6 = sumaDatosMamposteria20[0]
            this.SB6 = sumaDatosMamposteria20[1]
            this.dobleSin20 = sumaDatosMamposteria20[2]
            this.HMSin20 = sumaDatosMamposteria20[3]
            this.hembraSin20 = sumaDatosMamposteria20[4]
            this.maestraSin20 = sumaDatosMamposteria20[5]
            this.maestraNuevaSin20 = sumaDatosMamposteria20[6]
            this.mixtoSin20 = sumaDatosMamposteria20[7]
            //data graficos
            this.momposteroOption620 = {
                series: mamposteriaGeneral20,
                chart: {
                  type: "bar",
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "75%"
                  }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                      return val.toString();
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "14px",
                      colors: ["#000000"]
                    }
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"]
                },
                xaxis: {
                  categories: this.mesesNombre
                },
                yaxis: {
                  title: {
                    text: "Unidades"
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function(val) {
                      return val + " Unidades";
                    }
                  }
                }
            };
            //grafico Circle
            this.chartOptionsCircleMamposteria20 = {
              series: porcentajeMamposteria20,
              chart: {
                height: 450,
                type: "radialBar"
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: "1%",
                    background: "transparent",
                    image: undefined
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
              colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
              labels: ["6 CB", "6 SB", "Doble SB", "Hembra/Macho SB", "Hembra SB", "Maestra SB", "Maestra Nueva SB", "Mixto SB"],
              legend: {
                show: true,
                floating: true,
                fontSize: "16px",
                position: "left",
                offsetX: 13,
                offsetY: 10,
                labels: {
                  useSeriesColors: true
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]+'%';
                },
                itemMargin: {
                  horizontal: 3
                }
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: false
                    }
                  }
                }
              ]
            };

            this.cd.detectChanges();

        });
    }

    procesarDatos(entradaDatos) {
      //añadir digitos al mes faltante
      
      let objetoFormateado = {};
      for (let key in entradaDatos) {
        let formattedKey = key.padStart(2, '0')
        objetoFormateado[formattedKey] = entradaDatos[key]
      }
      //console.log('entrada de datos ', objetoFormateado)
      let todosLosMeses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
      //rango de meses
      let mesesPresentes = Object.keys(objetoFormateado).map(m => parseInt(m))
      let primerMes = Math.min(...mesesPresentes);
      let ultimoMes = Math.max(...mesesPresentes);
      //agrega valores al mes faltante
      for (let mes of todosLosMeses) {
        let mesNumerico = parseInt(mes);
        if (mesNumerico >= primerMes && mesNumerico <= ultimoMes) {
          if (!objetoFormateado.hasOwnProperty(mes)) {
            objetoFormateado[mes] = [0];
          }
        }
      }
      //meses ordenados salida de datos
      let objetoOrdenado = {};
      Object.keys(objetoFormateado).sort().forEach(key => {
        objetoOrdenado[key] = objetoFormateado[key];
      })
      return objetoOrdenado
    }

    // filtroMesDia(data, fechaInicio, fechaFin) {
    //   const datosFiltrados = {}

    //   for (const tipoProducto in data) {
    //     if (data.hasOwnProperty(tipoProducto)) {
    //       datosFiltrados[tipoProducto] = {}

    //       for (const mes in data[tipoProducto]) {
    //         if (data[tipoProducto].hasOwnProperty(mes)) {
    //           for (const dia in data[tipoProducto][mes]) {
    //             if (data[tipoProducto][mes].hasOwnProperty(dia)) {
    //               const fechaCompleta = new Date(2024, parseInt(mes) - 1, parseInt(dia))
    //               //console.log('fecha completa ', fechaCompleta)
    //               if (fechaCompleta >= fechaInicio && fechaCompleta <= fechaFin) {
    //                 if (!datosFiltrados[tipoProducto][mes]) {
    //                   datosFiltrados[tipoProducto][mes] = {}
    //                 }
    //                 datosFiltrados[tipoProducto][mes][dia] = data[tipoProducto][mes][dia]
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }

    //   for (const tipoProducto in datosFiltrados) {
    //     if (datosFiltrados.hasOwnProperty(tipoProducto)) {
    //       for (const mes in datosFiltrados[tipoProducto]) {
    //         if (datosFiltrados[tipoProducto].hasOwnProperty(mes)) {
    //           if (Object.keys(datosFiltrados[tipoProducto][mes]).length === 0) {
    //             delete datosFiltrados[tipoProducto][mes]
    //           }
    //         }
    //       }
    //     }
    //   }

    //   for (const tipoProducto in datosFiltrados) {
    //     if (datosFiltrados.hasOwnProperty(tipoProducto)) {
    //       if (Object.keys(datosFiltrados[tipoProducto]).length === 0) {
    //         delete datosFiltrados[tipoProducto]
    //       }
    //     }
    //   }
    //   //console.log('Datos filtrados mes => ', datosFiltrados)
    //   return datosFiltrados
    // }

    cargaDataDinteles() {
      this.stockService.findAllStock('Ventanas').subscribe(data => {
        const dinteles = data[0]['']['']
        //console.log('dinteles => ',dinteles)
        const fechaInicio = new Date(this.fechaInicio)
        const fechaFin = new Date(this.fechaFin)
        //fechas
        //this.actualizarMeses()
        //filtro
        //let datosFiltrados = this.filtroMesDia(dinteles, fechaInicio, fechaFin)
        const datosFiltrados = {}
        for (const tipoProducto in dinteles) {
          if (dinteles.hasOwnProperty(tipoProducto)) {
            datosFiltrados[tipoProducto] = {}
  
            for (const mes in dinteles[tipoProducto]) {
              if (dinteles[tipoProducto].hasOwnProperty(mes)) {
                for (const dia in dinteles[tipoProducto][mes]) {
                  if (dinteles[tipoProducto][mes].hasOwnProperty(dia)) {
                    const fechaCompleta = new Date(2024, parseInt(mes) - 1, parseInt(dia))
                    //console.log('fecha completa ', fechaCompleta)
                    if (fechaCompleta >= fechaInicio && fechaCompleta <= fechaFin) {
                      if (!datosFiltrados[tipoProducto][mes]) {
                        datosFiltrados[tipoProducto][mes] = {}
                      }
                      datosFiltrados[tipoProducto][mes][dia] = dinteles[tipoProducto][mes][dia]
                    }
                  }
                }
              }
            }
          }
        }
  
        for (const tipoProducto in datosFiltrados) {
          if (datosFiltrados.hasOwnProperty(tipoProducto)) {
            for (const mes in datosFiltrados[tipoProducto]) {
              if (datosFiltrados[tipoProducto].hasOwnProperty(mes)) {
                if (Object.keys(datosFiltrados[tipoProducto][mes]).length === 0) {
                  delete datosFiltrados[tipoProducto][mes]
                }
              }
            }
          }
        }
  
        for (const tipoProducto in datosFiltrados) {
          if (datosFiltrados.hasOwnProperty(tipoProducto)) {
            if (Object.keys(datosFiltrados[tipoProducto]).length === 0) {
              delete datosFiltrados[tipoProducto]
            }
          }
        }

        //console.log('Datos filtrados mes => ', datosFiltrados)
        //suma por mes
        const resultado = {}
        for (let din1 in datosFiltrados) {
          resultado[din1] = {}
          for (let din2 in datosFiltrados[din1]) {
            let sumaMes = 0
            for (let din3 in datosFiltrados[din1][din2]) {
              sumaMes += datosFiltrados[din1][din2][din3]
            }
            resultado[din1][din2] = sumaMes
          }
        }
        this.dintelesSuma = resultado
        //console.log('verificar dato 075 ', this.dintelesSuma)

        //050
        const resultado050 = {};
        const data1 = this.dintelesSuma['050']
        for (const mes in data1) {
          if (!resultado050[mes]) {
            resultado050[mes] = []
          }
          resultado050[mes].push(data1[mes])

        }
        //funcion
        const objetoOrdenado = this.procesarDatos(resultado050)
        //nuevo filtro
        const dintelesNueva = {
          name: '050',
          data: []
        }
        for(const datos050 in objetoOrdenado) {
          dintelesNueva.data.push(objetoOrdenado[datos050][0])
        }

        let dintelesGrafica = [];
        dintelesGrafica.push(dintelesNueva)
        const dintel050 = dintelesGrafica[0].data ?? []
        this.dintelesGraficaTotal050 = dintel050[0] || 0

        //062
        const resultado062 = {};
        const data2 = this.dintelesSuma['062']
        console.log('data 062 ',data2)
        for (const mes in data2) {
          if (!resultado062[mes]) {
            resultado062[mes] = []
          }
          resultado062[mes].push(data2[mes])

        }

        const objetoOrdenado062 = this.procesarDatos(resultado062)
        console.log('datos 062 ', objetoOrdenado062)
        //nuevo filtro
        const dintelesNueva062 = {
          name: '062',
          data: []
        }
        for(const datos050 in objetoOrdenado062) {
          dintelesNueva062.data.push(objetoOrdenado062[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva062)

        //075
        const resultado075 = {};
        const data3 = this.dintelesSuma['075']
        for (const mes in data3) {
          if (!resultado075[mes]) {
            resultado075[mes] = []
          }
          resultado075[mes].push(data3[mes])

        }

        const objetoOrdenado075 = this.procesarDatos(resultado075)
        //nuevo filtro
        const dintelesNueva075 = {
          name: '075',
          data: []
        }
        for(const datos050 in objetoOrdenado075) {
          dintelesNueva075.data.push(objetoOrdenado075[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva075)
        
        const dintel075 = dintelesGrafica[2]?.data
        this.dintelesGraficaTotal075 = dintel075[0] || 0

        //087
        const resultado087 = {};
        const data4 = this.dintelesSuma['087']
        for (const mes in data4) {
          if (!resultado087[mes]) {
            resultado087[mes] = []
          }
          resultado087[mes].push(data4[mes])

        }

        const objetoOrdenado087 = this.procesarDatos(resultado087)
        //nuevo filtro
        const dintelesNueva087 = {
          name: '087',
          data: []
        }
        for(const datos050 in objetoOrdenado087) {
          dintelesNueva087.data.push(objetoOrdenado087[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva087)
        const dintel087 = dintelesGrafica[3]?.data
        this.dintelesGraficaTotal085 = dintel087[0] || 0

        //100
        const resultado100 = {};
        const data5 = this.dintelesSuma['100']
        for (const mes in data5) {
          if (!resultado100[mes]) {
            resultado100[mes] = []
          }
          resultado100[mes].push(data5[mes])

        }

        const objetoOrdenado100 = this.procesarDatos(resultado100)
        //nuevo filtro
        const dintelesNueva100 = {
          name: '100',
          data: []
        }
        for(const datos050 in objetoOrdenado100) {
          dintelesNueva100.data.push(objetoOrdenado100[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva100)
        const dintel100 = dintelesGrafica[4]?.data
        this.dintelesGraficaTotal100 = dintel100[0] || 0

        //112
        const resultado112 = {};
        const data6 = this.dintelesSuma['112']
        for (const mes in data6) {
          if (!resultado112[mes]) {
            resultado112[mes] = []
          }
          resultado112[mes].push(data6[mes])

        }

        const objetoOrdenado112 = this.procesarDatos(resultado112)
        //nuevo filtro
        const dintelesNueva112 = {
          name: '112',
          data: []
        }
        for(const datos050 in objetoOrdenado112) {
          dintelesNueva112.data.push(objetoOrdenado112[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva112)
        const dintel112 = dintelesGrafica[5]?.data
        this.dintelesGraficaTotal112 = dintel112[0] || 0

        //125
        const resultado125 = {};
        const data7 = this.dintelesSuma['125']
        for (const mes in data7) {
          if (!resultado125[mes]) {
            resultado125[mes] = []
          }
          resultado125[mes].push(data7[mes])

        }

        const objetoOrdenado125 = this.procesarDatos(resultado125)
        //nuevo filtro
        const dintelesNueva125 = {
          name: '125',
          data: []
        }
        for(const datos050 in objetoOrdenado125) {
          dintelesNueva125.data.push(objetoOrdenado125[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva125)
        const dintel125 = dintelesGrafica[6]?.data
        this.dintelesGraficaTotal125 = dintel125[0] || 0

        //137
        const resultado137 = {};
        const data8 = this.dintelesSuma['137']
        for (const mes in data8) {
          if (!resultado137[mes]) {
            resultado137[mes] = []
          }
          resultado137[mes].push(data8[mes])

        }

        const objetoOrdenado137 = this.procesarDatos(resultado137)
        //nuevo filtro
        const dintelesNueva137 = {
          name: '137',
          data: []
        }
        for(const datos050 in objetoOrdenado137) {
          dintelesNueva137.data.push(objetoOrdenado137[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva137)
        const dintel137 = dintelesGrafica[7]?.data
        this.dintelesGraficaTotal137 = dintel137[0] || 0

        //150
        const resultado150 = {};
        const data9 = this.dintelesSuma['150']
        for (const mes in data9) {
          if (!resultado150[mes]) {
            resultado150[mes] = []
          }
          resultado150[mes].push(data9[mes])

        }

        const objetoOrdenado150 = this.procesarDatos(resultado150)
        //nuevo filtro
        const dintelesNueva150 = {
          name: '150',
          data: []
        }
        for(const datos050 in objetoOrdenado150) {
          dintelesNueva150.data.push(objetoOrdenado150[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva150)
        const dintel150 = dintelesGrafica[8]?.data
        this.dintelesGraficaTotal150 = dintel150[0] || 0

        //162
        const resultado162 = {};
        const data10 = this.dintelesSuma['162']
        for (const mes in data10) {
          if (!resultado162[mes]) {
            resultado162[mes] = []
          }
          resultado162[mes].push(data10[mes])

        }

        const objetoOrdenado162 = this.procesarDatos(resultado162)
        //nuevo filtro
        const dintelesNueva162 = {
          name: '162',
          data: []
        }
        for(const datos050 in objetoOrdenado162) {
          dintelesNueva162.data.push(objetoOrdenado162[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva162)
        const dintel162 = dintelesGrafica[9]?.data
        this.dintelesGraficaTotal162 = dintel162[0] || 0
        //175
        const resultado175 = {};
        const data11 = this.dintelesSuma['175']
        for (const mes in data11) {
          if (!resultado175[mes]) {
            resultado175[mes] = []
          }
          resultado175[mes].push(data11[mes])

        }

        const objetoOrdenado175 = this.procesarDatos(resultado175)
        //nuevo filtro
        const dintelesNueva175 = {
          name: '175',
          data: []
        }
        for(const datos050 in objetoOrdenado175) {
          dintelesNueva175.data.push(objetoOrdenado175[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva175)
        const dintel175 = dintelesGrafica[10]?.data
        this.dintelesGraficaTotal175 = dintel175[0] || 0
        //187
        const resultado187 = {};
        const data12 = this.dintelesSuma['187']
        for (const mes in data12) {
          if (!resultado187[mes]) {
            resultado187[mes] = []
          }
          resultado187[mes].push(data12[mes])

        }

        const objetoOrdenado187 = this.procesarDatos(resultado187)
        //nuevo filtro
        const dintelesNueva187 = {
          name: '187',
          data: []
        }
        for(const datos050 in objetoOrdenado187) {
          dintelesNueva187.data.push(objetoOrdenado187[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva187)
        const dintel187 = dintelesGrafica[11]?.data
        this.dintelesGraficaTotal187 = dintel187[0] || 0

        //200
        const resultado200 = {};
        const data13 = this.dintelesSuma['200']
        for (const mes in data13) {
          if (!resultado200[mes]) {
            resultado200[mes] = []
          }
          resultado200[mes].push(data13[mes])

        }

        const objetoOrdenado200 = this.procesarDatos(resultado200)
        //nuevo filtro
        const dintelesNueva200 = {
          name: '200',
          data: []
        }
        for(const datos050 in objetoOrdenado200) {
          dintelesNueva200.data.push(objetoOrdenado200[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva200)
        const dintel200 = dintelesGrafica[12]?.data
        this.dintelesGraficaTotal200 = dintel200[0] || 0
        //212
        const resultado212 = {};
        const data14 = this.dintelesSuma['212']
        for (const mes in data14) {
          if (!resultado212[mes]) {
            resultado212[mes] = []
          }
          resultado212[mes].push(data14[mes])

        }

        const objetoOrdenado212 = this.procesarDatos(resultado212)
        //nuevo filtro
        const dintelesNueva212 = {
          name: '212',
          data: []
        }
        for(const datos050 in objetoOrdenado212) {
          dintelesNueva212.data.push(objetoOrdenado212[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva212)
        const dintel212 = dintelesGrafica[13]?.data
        this.dintelesGraficaTotal212 = dintel212[0] || 0
        //225
        const resultado225 = {};
        const data15 = this.dintelesSuma['225']
        for (const mes in data15) {
          if (!resultado225[mes]) {
            resultado225[mes] = []
          }
          resultado225[mes].push(data15[mes])

        }

        const objetoOrdenado225 = this.procesarDatos(resultado225)
        //nuevo filtro
        const dintelesNueva225 = {
          name: '225',
          data: []
        }
        for(const datos050 in objetoOrdenado225) {
          dintelesNueva225.data.push(objetoOrdenado225[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva225)
        const dintel225 = dintelesGrafica[14]?.data
        this.dintelesGraficaTotal225 = dintel225[0] || 0

        //237
        const resultado237 = {};
        const data16 = this.dintelesSuma['237']
        for (const mes in data16) {
          if (!resultado237[mes]) {
            resultado237[mes] = []
          }
          resultado237[mes].push(data16[mes])

        }

        const objetoOrdenado237 = this.procesarDatos(resultado237)
        //nuevo filtro
        const dintelesNueva237 = {
          name: '237',
          data: []
        }
        for(const datos050 in objetoOrdenado237) {
          dintelesNueva237.data.push(objetoOrdenado237[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva237)
        const dintel237 = dintelesGrafica[15]?.data
        this.dintelesGraficaTotal237 = dintel237[0] || 0

        //250
        const resultado250 = {};
        const data17 = this.dintelesSuma['250']
        for (const mes in data17) {
          if (!resultado250[mes]) {
            resultado250[mes] = []
          }
          resultado250[mes].push(data17[mes])
        }

        const objetoOrdenado250 = this.procesarDatos(resultado250)
        //nuevo filtro
        const dintelesNueva250 = {
          name: '250',
          data: []
        }
        for(const datos050 in objetoOrdenado250) {
          dintelesNueva250.data.push(objetoOrdenado250[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva250)
        const dintel250 = dintelesGrafica[16]?.data
        this.dintelesGraficaTotal250 = dintel250[0] || 0

        //262
        const resultado262 = {};
        const data18 = this.dintelesSuma['262']
        for (const mes in data18) {
          if (!resultado262[mes]) {
            resultado262[mes] = []
          }
          resultado262[mes].push(data18[mes])

        }

        const objetoOrdenado262 = this.procesarDatos(resultado262)
        //nuevo filtro
        const dintelesNueva262 = {
          name: '262',
          data: []
        }
        for(const datos050 in objetoOrdenado262) {
          dintelesNueva262.data.push(objetoOrdenado262[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva262)
        const dintel262 = dintelesGrafica[17]?.data
        this.dintelesGraficaTotal262 = dintel262[0] || 0

        //275
        const resultado275 = {};
        const data19 = this.dintelesSuma['275']
        for (const mes in data19) {
          if (!resultado275[mes]) {
            resultado275[mes] = []
          }
          resultado275[mes].push(data19[mes])

        }

        const objetoOrdenado275 = this.procesarDatos(resultado275)
        //nuevo filtro
        const dintelesNueva275 = {
          name: '275',
          data: []
        }
        for(const datos050 in objetoOrdenado275) {
          dintelesNueva275.data.push(objetoOrdenado275[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva275)
        const dintel275 = dintelesGrafica[18]?.data
        this.dintelesGraficaTotal275 = dintel275[0] || 0
        //287
        const resultado287 = {};
        const data20 = this.dintelesSuma['287']
        for (const mes in data20) {
          if (!resultado287[mes]) {
            resultado287[mes] = []
          }
          resultado287[mes].push(data20[mes])

        }

        const objetoOrdenado287 = this.procesarDatos(resultado287)
        //nuevo filtro
        const dintelesNueva287 = {
          name: '287',
          data: []
        }
        for(const datos050 in objetoOrdenado287) {
          dintelesNueva287.data.push(objetoOrdenado287[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva287)
        const dintel287 = dintelesGrafica[19]?.data
        this.dintelesGraficaTotal287 = dintel287[0] || 0
        //300
        const resultado300 = {};
        const data21 = this.dintelesSuma['300']
        for (const mes in data21) {
          if (!resultado300[mes]) {
            resultado300[mes] = []
          }
          resultado300[mes].push(data21[mes])

        }

        const objetoOrdenado300 = this.procesarDatos(resultado300)
        //nuevo filtro
        const dintelesNueva300 = {
          name: '300',
          data: []
        }
        for(const datos050 in objetoOrdenado300) {
          dintelesNueva300.data.push(objetoOrdenado300[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva300)
        const dintel300 = dintelesGrafica[20]?.data
        this.dintelesGraficaTotal300 = dintel300[0] || 0
        //312
        const resultado312 = {};
        const data22 = this.dintelesSuma['312']
        for (const mes in data22) {
          if (!resultado312[mes]) {
            resultado312[mes] = []
          }
          resultado312[mes].push(data22[mes])

        }

        const objetoOrdenado312 = this.procesarDatos(resultado312)
        //nuevo filtro
        const dintelesNueva312 = {
          name: '312',
          data: []
        }
        for(const datos050 in objetoOrdenado312) {
          dintelesNueva312.data.push(objetoOrdenado312[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva312)
        const dintel312 = dintelesGrafica[21]?.data
        this.dintelesGraficaTotal312 = dintel312[0] || 0
        //325
        const resultado325 = {};
        const data23 = this.dintelesSuma['325']
        for (const mes in data23) {
          if (!resultado325[mes]) {
            resultado325[mes] = []
          }
          resultado325[mes].push(data23[mes])

        }

        const objetoOrdenado325 = this.procesarDatos(resultado325)
        //nuevo filtro
        const dintelesNueva325 = {
          name: '325',
          data: []
        }
        for(const datos050 in objetoOrdenado325) {
          dintelesNueva325.data.push(objetoOrdenado325[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva325)
        const dintel325 = dintelesGrafica[22]?.data
        this.dintelesGraficaTotal325 = dintel325[0] || 0
        //337
        const resultado337 = {};
        const data24 = this.dintelesSuma['337']
        for (const mes in data24) {
          if (!resultado337[mes]) {
            resultado337[mes] = []
          }
          resultado337[mes].push(data24[mes])

        }

        const objetoOrdenado337 = this.procesarDatos(resultado337)
        //nuevo filtro
        const dintelesNueva337 = {
          name: '337',
          data: []
        }
        for(const datos050 in objetoOrdenado337) {
          dintelesNueva337.data.push(objetoOrdenado337[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva337)
        const dintel337 = dintelesGrafica[23]?.data
        this.dintelesGraficaTotal337 = dintel337[0] || 0
        //350
        const resultado350 = {};
        const data25 = this.dintelesSuma['350']
        for (const mes in data25) {
          if (!resultado350[mes]) {
            resultado350[mes] = []
          }
          resultado350[mes].push(data25[mes])

        }

        const objetoOrdenado350 = this.procesarDatos(resultado350)
        //nuevo filtro
        const dintelesNueva350 = {
          name: '350',
          data: []
        }
        for(const datos050 in objetoOrdenado350) {
          dintelesNueva350.data.push(objetoOrdenado350[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva350)
        const dintel350 = dintelesGrafica[24]?.data
        this.dintelesGraficaTotal350 = dintel350[0] || 0
        //500
        const resultado500 = {};
        const data26 = this.dintelesSuma['500']
        for (const mes in data26) {
          if (!resultado500[mes]) {
            resultado500[mes] = []
          }
          resultado500[mes].push(data26[mes])

        }

        const objetoOrdenado500 = this.procesarDatos(resultado500)
        //nuevo filtro
        const dintelesNueva500 = {
          name: '500',
          data: []
        }
        for(const datos050 in objetoOrdenado500) {
          dintelesNueva500.data.push(objetoOrdenado500[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva500)
        const dintel500 = dintelesGrafica[25]?.data
        this.dintelesGraficaTotal500 = dintel500[0] || 0
        //625
        const resultado625 = {};
        const data27 = this.dintelesSuma['625']
        for (const mes in data27) {
          if (!resultado625[mes]) {
            resultado625[mes] = []
          }
          resultado625[mes].push(data27[mes])

        }

        const objetoOrdenado625 = this.procesarDatos(resultado625)
        //nuevo filtro
        const dintelesNueva625 = {
          name: '625',
          data: []
        }
        for(const datos050 in objetoOrdenado625) {
          dintelesNueva625.data.push(objetoOrdenado625[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva625)
        const dintel625 = dintelesGrafica[26]?.data
        this.dintelesGraficaTotal625 = dintel625[0] || 0
        //750
        const resultado750 = {};
        const data28 = this.dintelesSuma['750']
        for (const mes in data28) {
          if (!resultado750[mes]) {
            resultado750[mes] = []
          }
          resultado750[mes].push(data28[mes])

        }

        const objetoOrdenado750 = this.procesarDatos(resultado750)
        //nuevo filtro
        const dintelesNueva750 = {
          name: '750',
          data: []
        }
        for(const datos050 in objetoOrdenado750) {
          dintelesNueva750.data.push(objetoOrdenado750[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva750)
        const dintel750 = dintelesGrafica[27]?.data
        this.dintelesGraficaTotal750 = dintel750[0] || 0
        //875
        const resultado875 = {};
        const data29 = this.dintelesSuma['875']
        for (const mes in data29) {
          if (!resultado875[mes]) {
            resultado875[mes] = []
          }
          resultado875[mes].push(data29[mes])

        }

        const objetoOrdenado875 = this.procesarDatos(resultado875)
        //nuevo filtro
        const dintelesNueva875 = {
          name: '875',
          data: []
        }
        for(const datos050 in objetoOrdenado875) {
          dintelesNueva875.data.push(objetoOrdenado875[datos050][0])
        }

        dintelesGrafica.push(dintelesNueva875)
        this.tablaDinteles = dintelesGrafica
        console.log('data dinteles ', dintelesGrafica)
        // this.dataSource$ = new MatTableDataSource(this.tablaDinteles)
        // this.dataSource$.paginator = this.paginator;
        const copiaMesDintel = dintelesGrafica
        const sumaMesDintel = copiaMesDintel.map(dintel => dintel.data.reduce((total, value) => total + value, 0))
        console.log('data dinteles ', sumaMesDintel)
        //filtro Grafico
        const dintelesFiltro = dintelesGrafica.map((serie, index) => ({
          name: serie.name,
          data: serie.data,
          visible: index < this.cantidadSeries
        }));
        //console.log('filtro grafica ', dintelesFiltro)
        //Datos Grafica
        this.dintelOption = {
          series: dintelesFiltro.map(serie => ({
            name: serie.name,
            data: serie.data
          })),
          chart: {
            type: "bar",
            height: 350,
            events: {
              mounted: (chartContext, config) => {
                dintelesFiltro.forEach((serie) => {
                  if (!serie.visible) {
                    chartContext.toggleSeries(serie.name); 
                  }
                });
              }
            },
            
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
            }
          },
          legend: {
            show: true,
            onItemClick: {
              toggleDataSeries: true
            },
            onItemHover: {
              highlightDataSeries: true
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val) {
              return val + '';
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: this.mesesNombre
          },
          yaxis: {
            title: {
              text: "Unidades"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val + " Unidades";
              }
            }
          }
        };
        //graficos total meses
        this.dintelOptionTotal = {
          series: [
            {
              name: "Dinteles",
              data: sumaMesDintel
            }
          ],
          chart: {
            type: "bar",
            height: 600
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "14px",
              colors: ["#000"]
            }
          },
          xaxis: {
            categories: ["050","062","075","087","100","112","125","137","150","162","175","187","200","212","225","237","250","262","275","287","300","312","325","337","350","500","625","750","875"]
          }
        };
        this.cd.detectChanges();
      })
    }

    setfechaIncio(inicio) {
      this.fechaInicio = inicio
      this.actualizarMeses()
    }

    setfechaFin(fin) {
      this.fechaFin = fin
      this.actualizarMeses()
    }

    formatFecha(fecha){
      const [year, month, day] = fecha.split('-')
      return `${day}-${month}-${year}`
    }

    convertirFecha(fecha) {
      const [day, month, year] = fecha.split('-')
      return new Date(+year, +month - 1, +day)
    }

    obtenerMesesEntreFechas(fechaInicio, fechaFin) {
      const nombreMeses: string[] = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      const startDate = this.convertirFecha(fechaInicio)
      const endDate = this.convertirFecha(fechaFin)
      const meses: string[] = []

      let fechaActual = new Date(startDate.getFullYear(), startDate.getMonth(), 1)

      while (fechaActual <= endDate) {
        const mes = fechaActual.getMonth()
        const nombreMes = nombreMeses[mes]
        if (!meses.includes(nombreMes)) {
          meses.push(nombreMes)
        }
        // Avanza al primer día del siguiente mes
        fechaActual.setMonth(fechaActual.getMonth() + 1)
      }

      return meses
    }
    actualizarMeses(){
      this.mesesNombre = this.obtenerMesesEntreFechas(this.formatFecha(this.fechaInicio), this.formatFecha(this.fechaFin))
      console.log('Meses nombre:', this.mesesNombre)
    }

    cargarTablaMorteros() {
        // console.log(this.displayedColumnsMorteros);
        // console.log(this.columnsToDisplayMorteros);

        // console.log(this.dataStockMorteros);
        let ELEMENT_DATA = [];
        console.log('tabla morteros: ', this.dataStockMorteros)
        this.dataStockMorteros.forEach((element, index) => {
            let total = 0;
            console.log(element);
            element.data.forEach((element2) => {
                console.log(element2.nombre2);
                let cantidad = parseInt(element2.nombre2) * element2.valor;
                total += cantidad;
                console.log(total);
            });

            ELEMENT_DATA.push({
                TIPO: { valor: element.titulo },
                total: { valor: total },
                palets: { valor: (total / 60).toFixed(2) },
            });

            let valorF = 0;
        });
        console.log('Morteros', ELEMENT_DATA);

        ELEMENT_DATA.forEach((data) => {
            let json = {};
            if (data.TIPO.valor === 'Morteros  NV') {
                data.TIPO.valor = 'Grout de Nivelación';
            }
            if (data.TIPO.valor === 'Morteros  SE') {
                data.TIPO.valor = 'Seal Estandar';
            }
            if (data.TIPO.valor === 'Morteros GP') {
                data.TIPO.valor = 'Grout Plus';
            }
            if (data.TIPO.valor === 'Morteros  GE') {
                data.TIPO.valor = 'Grout Estandar';
            }
            if (data.TIPO.valor === 'Morteros  SP') {
                data.TIPO.valor = 'Grout Plus';
            }
        });
        console.log('asdasdasd', ELEMENT_DATA);

        this.dataTableMorteros = ELEMENT_DATA;

        this._changeDetectorRef.markForCheck();
    }

    async getStockGraficasDinteles() {
        let cabecerasDinteles = [];
        this.stockService
            .findAllStockReal('Ventanas')
            .subscribe(async (data) => {
                console.log('Data Graficas DINTELES', data);
                this.dataStockDinteles = [];
                for (var key in data) {
                    let titulo = 'Dinteles ';
                    for (var key2 in data[key]) {
                        for (var key3 in data[key][key2]) {
                            const tituloNuevo = titulo + ' ' + key3;
                            const resultado = this.dataStockDinteles.find(
                                (fruta) => fruta.titulo === tituloNuevo
                            );
                            if (resultado === undefined) {
                                this.dataStockDinteles.push({
                                    titulo: tituloNuevo,
                                    data: [],
                                    total: 0,
                                });
                            }
                            for (var key4 in data[key][key2][key3]) {
                                let existe = 'Dinteles ' + ' ' + key3;
                                const resultado = this.dataStockDinteles.find(
                                    (fruta) => fruta.titulo === existe
                                );
                                const nombre2 = key4;
                                resultado.data.push({
                                    nombre: key2,
                                    nombre2: nombre2,
                                    valor: data[key][key2][key3][key4],
                                });

                                resultado.total =
                                    resultado.total +
                                    data[key][key2][key3][key4];
                            }
                        }
                    }
                }
                this.cargarTablaDinteles();
                // console.log('FIn', this.dataStockDinteles);
                this._changeDetectorRef.markForCheck();
            });
        this._changeDetectorRef.markForCheck();
    }

    cargarTablaDinteles() {
        console.log(this.dataStockDinteles);
        let nuevo: any[];
        let data = [];
        let categoria = [];
        this.dataStockDinteles.forEach((element, index) => {
            // console.log('DINTELESCARAGAA', element);
            nuevo = element.data.sort(function (a, b) {
                var textA = a.nombre2;
                var textB = b.nombre2;
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });

            nuevo.forEach((element2) => {
                categoria.push(element2.nombre2 + ' cm');
                data.push(element2.valor);
            });
            // console.log(nuevo);
        });

        this.chartOptions = {
            series: [
                {
                    data: data,
                },
            ],
            chart: {
                type: 'bar',
                height: 500,
                stacked: true,
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    opacity: 0.25,
                },
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom',
                    },
                },
            },
            colors: [
                '#33b2df',
                '#546E7A',
                '#d4526e',
                '#13d8aa',
                '#A5978B',
                '#2b908f',
                '#f9a3a4',
                '#90ee7e',
                '#f48024',
                '#69d2e7',
            ],
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#000000'],
                },
                /*formatter: function (val, opt) {
                    return (
                        opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                    );
                },*/
                formatter: function (val, opt) {
                    return '' + val;
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true,
                },
            },
            stroke: {
                width: 2,
                colors: ['#fff'],
            },
            xaxis: {
                categories: categoria,
            },
            yaxis: {
                /* labels: {
                    show: false,
                },*/
                title: {
                    text: undefined,
                },
            },
            title: {
                text: 'Stock Dinteles',
                align: 'center',
                floating: true,
            },
            /*subtitle: {
                text: 'Category Names as DataLabels inside bars',
                align: 'center',
            },*/
            tooltip: {
                theme: 'dark',
                shared: false,
                y: {
                    title: {
                        formatter: function () {
                            return '';
                        },
                    },
                    formatter: function (val) {
                        return val + '';
                    },
                },
            },

            legend: {
                position: 'right',
                offsetY: 40,
                /*formatter: function (val) {
                    return val + 'K';
                },*/
                formatter: function (val, opt) {
                    console.log(val);
                    console.log(opt);
                    let nuevo: any = val.split('cm');
                    nuevo = nuevo[0];
                    if (nuevo[0] === '0') {
                        nuevo = parseFloat(nuevo);
                        nuevo = parseFloat('0.' + nuevo);
                    }

                    let multi =
                        opt.w.globals.stackedSeriesTotals[opt.seriesIndex] *
                        nuevo;
                    return val + ' = ' + multi + ' ml';
                },
            },
        };
        this._changeDetectorRef.markForCheck();
    }

    /***********************MAT TABLE PRODUCCTION******************* */

    getDataProduction() {
        this.stockService.findAll().subscribe((data) => {
            let result = _.chain(data)
                // Group the elements of Array based on `color` property
                .groupBy('type')
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => ({ type: key, data: value }))
                .value();
            // console.log('Aquii', result);
            this.dataProduccion = result;
        });
    }
}
