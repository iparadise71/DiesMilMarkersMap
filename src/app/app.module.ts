import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { MapingComponent } from './maping/maping.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteListModule} from 'angular-infinite-list';
import { InfinitListScrollComponent } from './infinit-list-scroll/infinit-list-scroll.component';

@NgModule({
    declarations: [
        AppComponent,
        MapingComponent,
        InfinitListScrollComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InfiniteListModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC8JfdxUutJ8V60GtQnmGjx3qtFQyg9cH0'
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
