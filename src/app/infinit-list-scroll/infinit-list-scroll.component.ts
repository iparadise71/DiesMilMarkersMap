import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subject, Subscription} from 'rxjs';
import {UbicacionActualesBean} from '../currentLocation-bean';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-infinit-list-scroll',
    templateUrl: './infinit-list-scroll.component.html',
    styleUrls: ['./infinit-list-scroll.component.scss']
})
export class InfinitListScrollComponent implements OnInit , OnDestroy {
    public listMarckers: UbicacionActualesBean[];


    // SCROLL BUFFER
    public scrollToIndex;
    public scrollToAlignment = 'auto';
    public opts: string[] = ['auto', 'start', 'center', 'end'];
    public event: any;
    public subScroll: Subscription;
    constructor(
        private cdRef: ChangeDetectorRef,
        private httpService: HttpClient
    ) { }

    ngOnInit() {
        // this.data = this.generateData(100000);
        this.listMarckers = new Array();
        this.httpService.get('assets/datos.json').subscribe(
            data => {
                this.listMarckers = JSON.parse(JSON.stringify(data));
                console.log(this.listMarckers);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);
            }
        );
    }
    ngOnDestroy() {
        this.subScroll && this.subScroll.unsubscribe();
    }


    public update($event: Subject<any>) {
        this.subScroll = $event.subscribe(x => {
            this.cdRef.detectChanges();
            this.event = x;
        });
    }

    public getClass(i: number): any {
        if (i === this.scrollToIndex) { return 'active'; } else { return ''; }
    }

    public setPositionIndex(x){
        if(x === 'n'){
            this.scrollToIndex = null;
        }else {
            this.scrollToIndex = x;
        }
    }

    public input() {
        console.log(this.scrollToIndex);
    }

}
