import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cancion, CancionService } from 'src/app/services/cancion.service';
import { EmocionEspecifica, EmocionGeneral, EmocionService } from 'src/app/services/emocion.service';
import { Lugar, LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-buscar-cancion',
  templateUrl: './buscar-cancion.component.html',
  styleUrls: ['./buscar-cancion.component.css']
})
export class BuscarCancionComponent implements OnInit {
    
    canciones : Cancion[] = [];
    emociones : EmocionGeneral[] = [];
    lugares : Lugar[] = [];

    hayEmocionSeleccionada : boolean = false;
    emocionSeleccionada : EmocionGeneral;
    
    private emocionGeneralDefault: EmocionGeneral = {
        nombre: "",
        emociones: []
    };

    @ViewChild('cmbEmocionEspecifica') cmbEmocionEspecifica: ElementRef;
    txtBuscar : string;

    constructor (
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private router : Router,
        private route : ActivatedRoute) { }

    // EVENTOS
    // EVENTOS DE ANGULAR
    ngOnInit(): void { 
        this.servicio.getCanciones(0).subscribe(respuesta => {
            this.canciones = respuesta.content;
        });

        this.servicioEmociones.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta;
        });

        this.servicioLugares.getLugares().subscribe(respuesta => {
            this.lugares = respuesta;
        });
    }

    // EVENTOS PROPIOS
    onCambioSeleccionEmocionGeneral(emocionSeleccionada : any) {
        this.cmbEmocionEspecifica.nativeElement.selectedIndex = 0;

        if (emocionSeleccionada == "") {
            this.hayEmocionSeleccionada = false;

            this.emocionSeleccionada = null;
        } else {
            this.hayEmocionSeleccionada = true;
            
            this.emocionSeleccionada = this.emociones[emocionSeleccionada];
        }
    }

    onSubmit() {
        let emocionEspecificaIndice= this.cmbEmocionEspecifica.nativeElement.selectedIndex;;
        let emocionGeneralSeleccionada = this.emocionSeleccionada;
        let emocionEspecificaSeleccionada;

        if (emocionGeneralSeleccionada != null && emocionEspecificaIndice != 0) {
            emocionGeneralSeleccionada = null;
            emocionEspecificaSeleccionada = this.emocionSeleccionada.emociones[emocionEspecificaIndice - 1];
        }

        console.log(this.txtBuscar);
        console.log(emocionGeneralSeleccionada);
        console.log(emocionEspecificaSeleccionada);

        this.servicio.buscarCancionSimple(this.txtBuscar,
            emocionGeneralSeleccionada,
            emocionEspecificaSeleccionada)
            
            .subscribe(respuesta => {
                this.canciones = respuesta.content;
            });
    }

    reproducir(cancionId : number) {
        this.servicio.reproducir(cancionId).subscribe();
    }

    getEmocionSeleccionada() : EmocionGeneral {
        if (this.emocionSeleccionada == null) {
            return this.emocionGeneralDefault;
        }

        return this.emocionSeleccionada;
    }
}
