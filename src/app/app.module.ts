import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/templates/navbar/navbar.component';
import { MenuComponent } from './components/templates/menu/menu.component';
import { CancionService } from './services/cancion.service';
import { LugarService } from './services/lugar.service';
import { AgregarCancionComponent } from './components/cancion/agregar-cancion/agregar-cancion.component';
import { BuscarCancionComponent } from './components/cancion/buscar-cancion/buscar-cancion.component';
import { EmocionService } from './services/emocion.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarCancionComponent } from './components/cancion/editar-cancion/editar-cancion.component';
import { FormularioCancionComponent } from './components/cancion/formulario-cancion/formulario-cancion.component';
import { ConsultarCancionComponent } from './components/cancion/consultar-cancion/consultar-cancion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    AgregarCancionComponent,
    BuscarCancionComponent,
    EditarCancionComponent,
    FormularioCancionComponent,
    ConsultarCancionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [CancionService, EmocionService, LugarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
