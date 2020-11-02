import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';
import { BuscarCancionComponent } from './components/buscar-cancion/buscar-cancion.component';

const routes: Routes = [
    { path: '', component: BuscarCancionComponent },
    { path: 'agregar-cancion', component: AgregarCancionComponent },
    { path : '**', pathMatch: 'full', redirectTo : '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
