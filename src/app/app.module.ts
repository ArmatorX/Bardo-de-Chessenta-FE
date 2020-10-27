import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/templates/navbar/navbar.component';
import { MenuComponent } from './components/templates/menu/menu.component';
import { CancionService } from './services/cancion.service';
import { EmocionEspecificaService } from './services/emocion-especifica.service';
import { LugarService } from './services/lugar.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CancionService, EmocionEspecificaService, LugarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
