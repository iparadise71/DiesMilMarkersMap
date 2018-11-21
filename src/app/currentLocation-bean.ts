export class UbicacionActualesBean {
    public idUbicacionActual: number;
    public imei: string;
    public fechaUbicActual: Date = new Date();
    public horaUbicActual: Date = new Date();
    public sHoraUbicActual: string;
    public idSincUa: number;
    public horaUbicacion: Date;
    public horaUbicDet: Date;
    public latitud: any;
    public longitud: any;
    public estadoGps: any;
    public nroSatelite: number;
    public senialGsm: number;
    public velocidad: number;
    public direccion: any;
    public altitud: any;
    public hdop: any;
    public cantKm: number;
    public tiempoTotalRecorrido: number;
    public entradaAnalogica: string;
    public estadoInOut: string;
    public nivelBateria: any;
    public codEvento: number;
    public valorEvento: string;
    public aceleracion: any;
    public idPuntoControl: number;
    public idCuenta: number;
    public conectado: boolean;
    public sensor1: number;
    public sensor2: number;
    public sensor3: number;
    public sensor4: number;
    public entradaDigital: number;
    public salidaDigital: number;
    public puntoActivo: boolean;
    public mostrarHora: boolean;
    public colorDate: string;
    public porcentajeVelExc: string;

    public movInfoHist: boolean;
    public showMarkerHist: boolean;
    public showMarkerSelectedHist: boolean;
    public iconUrl: string;
    public iconSelected: string;
    public iconStart: string;
    public iconEnd: string;
    constructor() {
    }
}
