import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LatLngBounds, MapsAPILoader} from '@agm/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CONSTANT} from '../contantView';
import {ILEvent} from 'angular-infinite-list';
import {Subject} from 'rxjs';
declare var google: any;
@Component({
    selector: 'app-maping',
    templateUrl: './maping.component.html',
    styleUrls: ['./maping.component.scss']
})
export class MapingComponent implements OnInit {
    constructor(
        private mapsAPILoader: MapsAPILoader,
        private httpService: HttpClient
    ) {

    }
    public constant = CONSTANT;
    public lat = -17.383348;
    public lng = -66.184204;
    public mapOptions = { position: 3 };
    public zoomPosition = { position: 3 };
    public map;
    public listMarckers: any;
    public markers = [];
    public auxMarkers = [];
    public idMarckerSelected = 10;
    public events = [];
    public idIconSelected = 0;
    public sourceSelected = false;
    public iconSelected = false;
    public latlngBoundsGeo: LatLngBounds;

    public id;
    public interval = 200;
    public positionPlay = 0;
    public positionPreviusPlay = 0;
    public lengthPlay = 0;
    public statePlay = 0;
    ngOnInit() {
        this.httpService.get('assets/datos.json').subscribe(
            data => {
                this.listMarckers = data;
                console.log(this.listMarckers);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
        this.events = new Array();
        this.events = this.constant.CODE_EVENT_FILTER;
    }

    public mapReady(map) {
        console.log('**********');
        this.map = map;
    }

    setBounds() {
        console.log('EVENTOS BUSCADO');
    }

    prepareMarkers(){
        console.log('11111111');
        for (let i = 0; i < this.listMarckers.length; i++) {
            const x = this.listMarckers[i];
            if (this.events.find((r) => r.codeEventKey === x.codEvento).codeEventState === true) {
                this.auxMarkers.push(x);
            }
        }
        console.log('222222222');
        this.addMarckers();
        console.log('333333333');
    }
    addMarckers() {
        let activeMarker;
        let originMarker;
        let oldIcon;
        let oldZIndex;
        const maxZIndex = this.auxMarkers.length + this.auxMarkers.length;
        for (let i = 0; i < this.auxMarkers.length; i++) {
            const x = this.auxMarkers[i];
            let iconLabel = '';
            if (i === 0) {
                iconLabel = 'assets/img/m_star.png';
            } else if (i === this.auxMarkers.length - 1) {
                iconLabel = 'assets/img/m_end.png';
            } else {
                iconLabel = this.events.find((r) => r.codeEventKey === x.codEvento).icon;
            }
            originMarker = this.events.find((r) => r.codeEventKey === x.codEvento).icon;
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(x.latitud, x.longitud),
                icon: iconLabel,
                visible: true,
                clickable: true,
                map: this.map
            });
            google.maps.event.addListener(marker, 'click', ( ( marker, i ) => {
                return () => {
                    if (this.sourceSelected) {
                        console.log('*---------CAMBIANDO A TODOS LOS MARKERS INTERNO----------*');
                        this.sourceSelected = false;
                        if (this.iconSelected) {
                            this.resetMarkerSelected();
                        }
                    }
                    activeMarker && activeMarker.setIcon(oldIcon);
                    activeMarker && activeMarker.setZIndex(oldZIndex);
                    oldIcon = marker.getIcon();
                    oldZIndex = marker.getZIndex();
                    this.markerSelector(this.idIconSelected, i);
                    marker.setZIndex(maxZIndex);
                    activeMarker = marker;
                };
            })(marker, i));
            this.markers.push(marker);
        }
        this.fitBounds(this.auxMarkers);
        console.log('marckers agregados ' + this.listMarckers.length);
        console.log('marckers VALIDOS ' + this.auxMarkers.length);
    }

    selectMarker(id) {
        console.log('*---------CAMBIANDO A TODOS LOS MARKERS EXTERNO----------*');
        console.log(this.sourceSelected + ' -- ' + this.iconSelected);
        if (!this.sourceSelected) {
            this.sourceSelected = true;
        }
        if (this.iconSelected) {
            this.resetMarkerSelected();
        }
        this.markerSelector(this.idIconSelected, id);
    }

    markerSelector(idGlobal, idIcon) {
        if (idGlobal === idIcon) {
            console.log(idGlobal + ' -- ' + idIcon);
            console.log('RESTAURANDO');
            this.markers[idIcon].setIcon(this.events.find((r) => r.codeEventKey === this.auxMarkers[idIcon].codEvento).icon);
            this.idIconSelected = 0;
            this.iconSelected = false;
        } else {
            console.log(idGlobal + ' -- ' + idIcon);
            console.log('MARCANDO');
            this.markers[idIcon].setIcon('assets/img/m_selected.png');
            this.idIconSelected = idIcon;
            this.iconSelected = true;
        }
    }
    resetMarkerSelected() {
        for (const i in this.auxMarkers) {
            const coors = this.auxMarkers[i];
            if (this.markers[i].getIcon() === 'assets/img/m_selected.png') {
                this.markers[i].setIcon(this.events.find((r) => r.codeEventKey === coors.codEvento).icon);
            }
        }
    }

    deleteMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
        this.idIconSelected = 0;
        this.iconSelected = false;
    }
    clearMarkers() {
        this.setMapOnAll(null);
        this.idIconSelected = 0;
        this.iconSelected = false;
    }
    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            const x = this.markers[i];
            x.setMap(map);
        }
    }
    fitBounds(list) {
        this.mapsAPILoader.load().then(() => {
            this.latlngBoundsGeo = new window['google'].maps.LatLngBounds();
            for (const x of list) {
                this.latlngBoundsGeo.extend(new google.maps.LatLng(
                    { lat: x.latitud, lng: x.longitud }
                ));
            }
            this.map.fitBounds(this.latlngBoundsGeo);
        });
    }
    playMarkers() {
        if(this.statePlay === 0){
            this.setMapOnAll(null);
        }
        this.lengthPlay = this.auxMarkers.length;
        console.log('Reproducir MARKERS ' + this.positionPlay);
        this.id = setInterval(() => {
            console.log('MARKERS ANTES' + this.positionPlay + ' -- ' + this.positionPreviusPlay);
            this.positionPreviusPlay = this.positionPlay;
            if(this.positionPlay === 0){
                this.markers[this.positionPlay].setMap(this.map);
                this.positionPlay = this.positionPlay + 1;
            }else if(this.positionPlay === this.lengthPlay){
                this.markers[this.positionPlay].setMap(this.map);
                clearInterval(this.id);
            }else {
                this.resetMarkerSelected();
                this.markers[this.positionPlay].setIcon('assets/img/m_selected.png');
                this.markers[this.positionPlay].setMap(this.map);
                this.positionPlay = this.positionPlay + 1;
            }
            console.log('MARKERS DESPUES' + this.positionPlay + ' -- ' + this.positionPreviusPlay);
        }, this.interval);
    }

    pauseMarkers(){
        console.log('PAUSANDO REPROCUCCION MARKERS ');
        clearInterval(this.id);
        this.statePlay = 1;
    }
    stopMarkers() {
        console.log('PARANDO REPROCUCCION MARKERS ');
        console.log('MOSTRAR TODO');
        clearInterval(this.id);
        this.setMapOnAll(this.map);
        this.positionPlay = 0;
        this.lengthPlay = 0;
        this.statePlay = 0;
    }

}
