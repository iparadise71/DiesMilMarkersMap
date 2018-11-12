import { Component, OnInit } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CONSTANT} from '../contantView';
import {forEach} from '@angular/router/src/utils/collection';
import {el} from '@angular/platform-browser/testing/src/browser_util';
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

    public positionArray = 0;
    public stateArray = false;
    public events = [];
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
        console.log('*********************************************************');
        console.log(map);
        this.map = map;
        // this.map.data.setMapOnAll(null);
    }

    setBounds() {
        console.log('EVENTOS BUSCADO');
    }

    addMarckers() {
        let activeMarker;
        let originMarker;
        let codeEvent;
        let oldPosition;
        let oldIcon;
        let oldZIndex;
        const maxZIndex = this.listMarckers.length + this.listMarckers.length;
        for (let i = 0; i < this.listMarckers.length; i++) {
            const x = this.listMarckers[i];
            codeEvent = x.codEvento;
            let iconLabel = '';
            if (i === 0) {
                iconLabel = 'assets/img/m_star.png';
            } else if (i === this.listMarckers.length - 1) {
                iconLabel = 'assets/img/m_selected.png';
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
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    console.log('--------------------------------------------------');
                    console.log(i);
                    console.log(oldPosition);
                    console.log(x);
                    console.log(oldIcon);
                    console.log(oldZIndex);
                    console.log(maxZIndex);
                    console.log(this.getIcon());
                    activeMarker && activeMarker.setIcon(oldIcon);
                    activeMarker && activeMarker.setZIndex(oldZIndex);
                    oldIcon = this.getIcon();
                    oldZIndex = this.getZIndex();
                    if (i !== oldPosition) {
                        oldPosition = i;
                        marker.setIcon('assets/img/m_selected.png');
                    }else {
                        oldPosition = 0;
                        console.log('DESELECCIONADO');
                    }
                    marker.setZIndex(maxZIndex);
                    activeMarker = marker;
                };
            })(marker, i));
            this.markers.push(marker);
        }
        console.log('marckers agregados ' + this.listMarckers.length);
    }

    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            const x = this.markers[i];
            x.setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    clearMarkers() {
        this.setMapOnAll(null);
    }

    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
        this.positionArray = 0;
    }
    pauseMarckers() {
        this.stateArray = true;
    }
    drop() {
        this.clearMarkers();
        this.positionArray = this.listMarckers.length;
        for (let i = 0; i < this.positionArray; i++) {
            const x = this.listMarckers[i];
            this.addMarkerWithTimeout(x, i * 200, i);
            if (this.stateArray) {
                this.positionArray = i;
                break;
            }
        }
    }

    addMarkerWithTimeout(x, timeout, i) {
        setTimeout(() => {
            const x = this.listMarckers[i];
            let iconLabel = '';
            if (i === 0) {
                iconLabel = 'assets/img/m_star.png';
            } else if (i === this.listMarckers.length - 1) {
                iconLabel = 'assets/img/m_selected.png';
            } else {
                iconLabel = 'assets/img/m_mnn.png';
            }
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(x.latitud, x.longitud),
                icon: iconLabel,
                visible: true,
                clickable: true,
                zIndex: i,
                map: this.map
            });
            this.markers.push(marker);
            console.log(x);
            console.log(i);
        }, timeout);
        // this.id = setInterval(() => {
        //
        // }, timeout);
    }
}
