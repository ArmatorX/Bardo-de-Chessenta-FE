import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarCancionComponent } from './components/cancion/agregar-cancion/agregar-cancion.component';
import { BuscarCancionComponent } from './components/cancion/buscar-cancion/buscar-cancion.component';
import { ConsultarCancionComponent } from './components/cancion/consultar-cancion/consultar-cancion.component';
import { EditarCancionComponent } from './components/cancion/editar-cancion/editar-cancion.component';

const routes: Routes = [
    { path: '', component: BuscarCancionComponent },
    { path: 'agregar-cancion', component: AgregarCancionComponent },
    { path: 'editar-cancion/:id', component: EditarCancionComponent },
    { path: 'consultar-cancion/:id', component: ConsultarCancionComponent },
    { path : '**', pathMatch: 'full', redirectTo : '' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
