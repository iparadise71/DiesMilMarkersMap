import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapingComponent} from './maping/maping.component';

const routes: Routes = [
    { path: '', redirectTo: 'mapas', pathMatch: 'full' },
    { path: 'mapas', component: MapingComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
