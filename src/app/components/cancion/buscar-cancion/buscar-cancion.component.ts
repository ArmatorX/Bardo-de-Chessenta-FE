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
    
    private emocionGeneralDefault: EmocionGeneral = {
        nombre: "",
        emociones: []
    };


    // Mensajes de borrado
    mostrarErrorBorrar : boolean;;
    mostrarSuccessBorrar : boolean;

    // Paginación
    esPrimeraPagina : boolean;
    esUltimaPagina : boolean;
    paginaActual : number;
    cantidadPaginas : number;

    // Controles del bot
    activarBotonReproducir : boolean = true;
    tooltipBotNoConectado : string;

    // Parámetros de búsqueda
    seRealizoBusqueda : boolean = false;
    txtBuscar : string;

    hayEmocionGeneralSeleccionada : boolean = false;
    emocionGeneralSeleccionada : EmocionGeneral;
    @ViewChild('cmbEmocionEspecifica') cmbEmocionEspecifica: ElementRef;
    emocionEspecificaSeleccionada : EmocionEspecifica;

    constructor (
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private router : Router) { }

    // EVENTOS
    // EVENTOS DE ANGULAR
    ngOnInit(): void { 
        this.servicio.verificarConexionBot().subscribe(respuesta => {
            this.activarBotonReproducir = respuesta;

            if (this.activarBotonReproducir) {
                this.tooltipBotNoConectado = "";
            } else {
                this.tooltipBotNoConectado = "El bot no está conectado a ningún canal. Usá el comando '!connect' y recargá la página."
            }
        });

        this.irPrimeraPagina();

        this.servicioEmociones.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta;
        });

        this.servicioLugares.getLugares().subscribe(respuesta => {
            this.lugares = respuesta;
        });
    }

    // EVENTOS PROPIOS
    onCambioSeleccionEmocionGeneral(emocionGeneralSeleccionada : any) {
        this.cmbEmocionEspecifica.nativeElement.selectedIndex = 0;

        if (emocionGeneralSeleccionada == "") {
            this.hayEmocionGeneralSeleccionada = false;

            this.emocionGeneralSeleccionada = null;
        } else {
            this.hayEmocionGeneralSeleccionada = true;
            
            this.emocionGeneralSeleccionada = this.emociones[emocionGeneralSeleccionada];
        }
    }

    onSubmit() : void {
        let emocionEspecificaIndice = this.cmbEmocionEspecifica.nativeElement.selectedIndex;;
        
        let hayTexto : boolean = this.txtBuscar != "" && this.txtBuscar != null;
        let hayEmocion : boolean;

        let emocionBuscar : any;
        if (this.emocionGeneralSeleccionada != null) {
            if(emocionEspecificaIndice != 0) {
                this.emocionEspecificaSeleccionada = this.emocionGeneralSeleccionada.emociones[emocionEspecificaIndice - 1];
            } else {
                this.emocionEspecificaSeleccionada = null;
            }

            hayEmocion = true;
        }

        // console.log(this.txtBuscar);
        // console.log(emocionGeneralSeleccionada);
        // console.log(emocionEspecificaSeleccionada);

        this.seRealizoBusqueda = hayTexto || hayEmocion;

        this.paginaActual = 0;

        this.actualizarTablaCanciones();
    }

    reproducir(cancion : Cancion) : void {
        this.servicio.reproducir(cancion).subscribe();
    }

    getEmocionGeneralSeleccionada() : EmocionGeneral {
        if (this.emocionGeneralSeleccionada == null) {
            return this.emocionGeneralDefault;
        }

        return this.emocionGeneralSeleccionada;
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
        this.actualizarTablaCanciones();
    }
    
    irUltimaPagina() : void {
        this.paginaActual = this.cantidadPaginas;
        this.actualizarTablaCanciones();
    }

    irPaginaSiguiente() : void {
        this.paginaActual ++;
        this.actualizarTablaCanciones();
    }

    irPaginaAnterior() : void {
        this.paginaActual --;
        this.actualizarTablaCanciones();
    }

    irAPagina(nroPagina : number) : void {
        this.paginaActual = nroPagina;
        this.actualizarTablaCanciones();
    }

    getCanciones() : void {
        this.servicio.getCanciones(this.paginaActual - 1).subscribe(respuesta => {
            this.actualizarCanciones(respuesta);
        });

        // Reiniciar mensajes
        this.reiniciarMensajes();
    }

    actualizarCanciones(respuesta : any) : void {
        this.canciones = respuesta.content;

        // Paginación
        this.esPrimeraPagina = respuesta.first;
        this.esUltimaPagina = respuesta.last;
        this.paginaActual = respuesta.number + 1;
        this.cantidadPaginas = respuesta.totalPages;
    }

    reiniciarMensajes() : void {
        this.mostrarErrorBorrar = false;
        this.mostrarSuccessBorrar = false;
    }

    buscarSimple(txtBuscar : string, emocionGeneral : EmocionGeneral, emocionEspecifica : EmocionEspecifica) {
        this.servicio.buscarCancionSimple(this.paginaActual - 1,
            txtBuscar,
            emocionGeneral,
            emocionEspecifica)
            
            .subscribe(respuesta => {
                this.actualizarCanciones(respuesta);
            }); 

        this.reiniciarMensajes();
    }

    actualizarTablaCanciones() : void {
        if (this.seRealizoBusqueda)  {
            this.buscarSimple(this.txtBuscar, 
                this.emocionGeneralSeleccionada,
                this.emocionEspecificaSeleccionada);
        } else {
            this.getCanciones();
        }
    }

    editarCancion(cancionId : number) : void {
        this.router.navigate(['/editar-cancion/' + cancionId.toString()])
    }
}
