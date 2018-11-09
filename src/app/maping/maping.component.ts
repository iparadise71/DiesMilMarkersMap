import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-maping',
    templateUrl: './maping.component.html',
    styleUrls: ['./maping.component.scss']
})
export class MapingComponent implements OnInit {

    public lat = -17.383348;
    public lng = -66.184204;
    public mapOptions = { position: 3 };
    public zoomPosition = { position: 3 };
    public map;
    constructor(

    ) {

    }

    ngOnInit() {
    }

    public mapReady(map) {
        console.log('*********************************************************');
        console.log(map);
        this.map = map;
    }

    setBounds() {
        console.log('EVENTOS BUSCADO');
    }
}
