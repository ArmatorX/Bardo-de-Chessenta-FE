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

    // Mensajes de borrado
    mostrarErrorBorrar : boolean;;
    mostrarSuccessBorrar : boolean;

    // Paginación
    esPrimeraPagina : boolean;
    esUltimaPagina : boolean;
    paginaActual : number;
    cantidadPaginas : number;

    // Controles del bot
    activarBotonReproducir : boolean = false;

    constructor (
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private router : Router,
        private route : ActivatedRoute) { }

    // EVENTOS
    // EVENTOS DE ANGULAR
    ngOnInit(): void { 
        this.irPrimeraPagina();

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

    onSubmit() : void {
        let emocionEspecificaIndice= this.cmbEmocionEspecifica.nativeElement.selectedIndex;;
        let emocionGeneralSeleccionada = this.emocionSeleccionada;
        let emocionEspecificaSeleccionada;

        if (emocionGeneralSeleccionada != null && emocionEspecificaIndice != 0) {
            emocionGeneralSeleccionada = null;
            emocionEspecificaSeleccionada = this.emocionSeleccionada.emociones[emocionEspecificaIndice - 1];
        }

        // console.log(this.txtBuscar);
        // console.log(emocionGeneralSeleccionada);
        // console.log(emocionEspecificaSeleccionada);

        this.servicio.buscarCancionSimple(this.txtBuscar,
            emocionGeneralSeleccionada,
            emocionEspecificaSeleccionada)
            
            .subscribe(respuesta => {
                this.canciones = respuesta.content;
            }); 

        this.reiniciarMensajes();
    }

    reproducir(cancion : Cancion) : void {
        this.servicio.reproducir(cancion).subscribe();
    }

    getEmocionSeleccionada() : EmocionGeneral {
        if (this.emocionSeleccionada == null) {
            return this.emocionGeneralDefault;
        }

        return this.emocionSeleccionada;
    }

    borrarCancion(cancion : Cancion) : void {
        let txtAlerta = `¿Está seguro que desea eliminar la canción ${cancion.nombre}?`;

        this.mostrarErrorBorrar = false;
        this.mostrarSuccessBorrar = false;

        if (confirm(txtAlerta)) {
            this.servicio.borrarCancion(cancion).subscribe(
                () => { },
                error => {
                    this.mostrarErrorBorrar = true;
                    console.error(error);
                },
                () => {
                    this.getCanciones();
                    this.mostrarSuccessBorrar = true;
                }
            );
        }
    }

    // PAGINACIÓN
    irPrimeraPagina() : void {
        this.paginaActual = 1;
        this.getCanciones();
    }
    
    irUltimaPagina() : void {
        this.paginaActual = this.cantidadPaginas;
        this.getCanciones();
    }

    irPaginaSiguiente() : void {
        this.paginaActual ++;
        this.getCanciones();
    }

    irPaginaAnterior() : void {
        this.paginaActual --;
        this.getCanciones();
    }

    irAPagina(nroPagina : number) : void {
        this.paginaActual = nroPagina;
        this.getCanciones();
    }

    getCanciones() : void {
        this.servicio.getCanciones(this.paginaActual - 1).subscribe(respuesta => {
            this.canciones = respuesta.content;

            // Paginación
            this.esPrimeraPagina = respuesta.first;
            this.esUltimaPagina = respuesta.last;
            this.paginaActual = respuesta.number + 1;
            this.cantidadPaginas = respuesta.totalPages;
        });

        // Reiniciar mensajes
        this.reiniciarMensajes();
    }

    reiniciarMensajes() : void {
        this.mostrarErrorBorrar = false;
        this.mostrarSuccessBorrar = false;
    }
}
