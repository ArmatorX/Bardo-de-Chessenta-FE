import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
    @Input() cancion : Cancion;
    
    @Output() datosCargados : EventEmitter<number> = new EventEmitter<number>();
    cantidadDeDatosCargados : number = 0;

    emociones : EmocionGeneral[] = [];
    emocionSeleccionada : EmocionGeneral = EMOCION_GENERAL_VACIA;
    lugares : Lugar[] = [];

    // Form groups
    frmCancion : FormGroup;
    frmEmocion : FormGroup;

    // Controles formulario
    formularioDefaultCanciones : any;
    formularioDefaultEmociones : any;

    constructor(
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private formBuilder : FormBuilder,
        private router : Router) {}

    // EVENTOS
    // EVENTOS ANGULAR
    ngOnInit() {
        this.servicioEmociones.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta;
            this.cantidadDeDatosCargados ++;
            this.datosCargados.emit(this.cantidadDeDatosCargados);
        });

        this.servicioLugares.getLugares().subscribe(respuesta => {
            this.lugares = respuesta;
            this.cantidadDeDatosCargados ++;
            this.datosCargados.emit(this.cantidadDeDatosCargados);
        });

        this.datosCargados.subscribe(respuesta => {
            if (respuesta == 2) {
                this.crearFormulario(this.cancion);
            }
        });
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

        switch (this.modo) {
            case Modo.CREAR:
                this.servicio.guardarCancion(nuevaCancion).subscribe(respuesta => {
                    if (respuesta.id != null) {
                        this.limpiarFormulario();
                    }
                });

                break;

            case Modo.EDITAR:
                this.servicio.actualizarCancion(nuevaCancion).subscribe();

                break;
        }
    }

    onCancelar() {
        this.router.navigate(['']);
    }

    limpiarFormulario() {
        this.emocionSeleccionada = this.emociones.find(e => e.id == parseInt(this.formularioDefaultEmociones.emocionGeneral.value));
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
            id : this.modo == Modo.EDITAR ? parseInt(this.frmCancion.getRawValue().id) : null,
            nombre : datosCancion.nombre,
            link : datosCancion.url,
            origen : datosCancion.origen,
            emocion : this.emocionSeleccionada.emociones.find(e => e.id == parseInt(datosCancion.emocion.emocionEspecifica)),
            lugar : this.lugares.find(l => l.id == parseInt(datosCancion.lugar)),
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
            emocionGeneral = this.emociones.find(eg => {
                let emocion : EmocionEspecifica;
                emocion = eg.emociones.find(ee => ee.id == emocionEspecifica.id);

                return emocion != null;
            });

            this.emocionSeleccionada = emocionGeneral;
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
                disabled : this.modo != Modo.EDITAR
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


