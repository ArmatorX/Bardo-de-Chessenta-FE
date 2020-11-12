import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cancion, CancionService, CANCION_VACIA } from 'src/app/services/cancion.service';
import { EmocionEspecifica, EmocionGeneral, EmocionService, EMOCION_GENERAL_VACIA } from 'src/app/services/emocion.service';
import { Lugar, LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-formulario-cancion',
  templateUrl: './formulario-cancion.component.html',
  styleUrls: ['./formulario-cancion.component.css']
})
export class FormularioCancionComponent implements OnInit {
    @Input() modo : Modo;
    @Input() cancionId : number;

    emociones : EmocionGeneral[] = [];
    emocionSeleccionada : EmocionGeneral = {
        nombre : "",
        emociones : []
    };
    lugares : Lugar[] = [];

    // Form groups
    frmCancion : FormGroup;
    frmEmocion : FormGroup;

    // Controles formulario
    registroCorrecto : boolean = false;
    formularioDefaultCanciones : any;
    formularioDefaultEmociones : any;

    constructor(
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private formBuilder : FormBuilder) {}

    // EVENTOS
    // EVENTOS ANGULAR
    ngOnInit() {
        if (this.cancionId != null) {
            this.servicio.getCancionById(this.cancionId);
        }

        this.servicioEmociones.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta;
        });

        this.servicioLugares.getLugares().subscribe(respuesta => {
            this.lugares = respuesta;
        });

        this.crearFormulario();
    }

    // EVENTOS PROPIOS
    onCambioSeleccionEmocionGeneral(emocionSeleccionadaId : number) {
        this.frmEmocion.controls['emocionEspecifica'].enable();
        
        this.emocionSeleccionada = this.emociones.find(e => e.id == emocionSeleccionadaId);

        this.frmEmocion.controls['emocionEspecifica'].reset('-1');
    }

    onSubmit(datosNuevaCancion : any) {
        let nuevaCancion : Cancion;

        nuevaCancion = this.crearCancionDesdeFormulario(datosNuevaCancion);

        this.servicio.guardarCancion(nuevaCancion).subscribe(respuesta => {
            if (respuesta.id != null) {
                this.registroCorrecto = true;

                this.limpiarFormulario();
            }
        });
    }

    limpiarFormulario() {
        this.frmCancion.reset(this.formularioDefaultCanciones);
    }

    // encontrarEmocionGeneralPorNombre(nombreEmocion: string): EmocionGeneral {
    //     let emocion : EmocionGeneral;

    //     emocion = this.emociones.filter(e => e.nombre == nombreEmocion)[0];

    //     return emocion;
    // }

    // encontrarEmocionEspecificaPorNombre(nombreEmocion : string) : EmocionEspecifica {
    //     let emocion : EmocionEspecifica;

    //     emocion = this.emociones.filter(e => e.nombre == nombreEmocion)[0];

    //     return emocion;
    // }

    // encontrarLugarPorNombre(nombreLugar : string) : Lugar {
    //     let lugar : Lugar;

    //     lugar = this.lugares.filter(l => l.nombre == nombreLugar)[0];

    //     return lugar;
    // }

    crearCancionDesdeFormulario(datosCancion : any) : Cancion {
        let cancion : Cancion = {
            nombre : datosCancion.nombre,
            link : datosCancion.url,
            origen : datosCancion.origen,
            emocion : this.emocionSeleccionada.emociones[datosCancion.emocion.emocionEspecifica],
            lugar : this.lugares[datosCancion.lugar],
            extras : datosCancion.extra
        };

        return cancion;
    }

    crearFormulario(cancion? : Cancion) {
        if (cancion == null) {
            cancion = CANCION_VACIA;
        }

        this.inicializarFormularioDefault(cancion);

        this.frmEmocion = this.formBuilder.group({
            emocionGeneral : new FormControl(this.formularioDefaultEmociones.emocionGeneral, Validators.min(0)),
            emocionEspecifica : new FormControl(this.formularioDefaultEmociones.emocionEspecifica, Validators.min(0))
        });
        this.frmCancion = this.formBuilder.group({
            id : new FormControl(this.formularioDefaultCanciones.id),
            nombre : new FormControl(this.formularioDefaultCanciones.nombre, Validators.required),
            origen : new FormControl(this.formularioDefaultCanciones.origen, Validators.required),
            url : new FormControl(this.formularioDefaultCanciones.url, [Validators.required, Validators.pattern('((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9\?\=\-]*)?')]),
            emocion : this.frmEmocion,
            lugar : new FormControl(this.formularioDefaultCanciones.lugar, Validators.min(0)),
            extra : new FormControl(this.formularioDefaultCanciones.extra)
        });
    }

    buscarEmocionGeneralDesdeEspecifica(emocionEspecifica : EmocionEspecifica) : EmocionGeneral {
        let emocionGeneral : EmocionGeneral;

        if (emocionEspecifica.id == -1) {
            emocionGeneral = EMOCION_GENERAL_VACIA;
        } else {
            emocionGeneral = this.emociones.find(e => e.emociones.includes(emocionEspecifica));
        }

        return emocionGeneral;
    }

    inicializarFormularioDefault(cancion : Cancion) : void {
        let deshabilitarEdicion : boolean = (this.modo == Modo.CONSULTAR);

        this.formularioDefaultEmociones = {
            emocionGeneral : {
                value : this.buscarEmocionGeneralDesdeEspecifica(cancion.emocion).id,
                disabled : deshabilitarEdicion
            },
            emocionEspecifica : {
                value : cancion.emocion.id,
                disabled : true
            }
        };

        this.formularioDefaultCanciones = {
            id : {
               value : cancion.id,
               disabled : true
            },
            nombre : {
                value : cancion.nombre,
                disabled : deshabilitarEdicion
            },
            origen : {
                value : cancion.origen,
                disabled : deshabilitarEdicion
            },
            url : {
                value : cancion.link,
                disabled : deshabilitarEdicion
            },
            emocion : this.formularioDefaultEmociones,
            lugar : {
                value : cancion.lugar.id,
                disabled : deshabilitarEdicion
            },
            extra : {
                value : cancion.extras,
                disabled : deshabilitarEdicion
            }
        }
    }
}

export enum Modo {
    CREAR,
    EDITAR,
    CONSULTAR
}


