import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapingComponent} from './maping/maping.component';
import {InfinitListScrollComponent} from './infinit-list-scroll/infinit-list-scroll.component';

const routes: Routes = [
    { path: '', redirectTo: 'mapas', pathMatch: 'full' },
    { path: 'mapas', component: MapingComponent },
    { path: 'scroll', component: InfinitListScrollComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
