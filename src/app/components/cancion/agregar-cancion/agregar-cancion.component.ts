import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Cancion, CancionService } from 'src/app/services/cancion.service';
import { EmocionEspecifica, EmocionGeneral, EmocionService } from 'src/app/services/emocion.service';
import { Lugar, LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css']
})
export class AgregarCancionComponent implements OnInit {
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
    registroCorrecto = false;
    
    constructor(
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private router : Router,
        private route : ActivatedRoute,
        private formBuilder : FormBuilder) {
            // Form group emocion
            this.frmEmocion = this.formBuilder.group({
                emocionGeneral : new FormControl('-1', Validators.min(0)),
                emocionEspecifica : new FormControl({
                    value : '-1',
                    disabled : true
                }, Validators.min(0))
            });

            // Main form group
            this.frmCancion = this.formBuilder.group({
                nombre : new FormControl('', Validators.required),
                origen : new FormControl('', Validators.required),
                url : new FormControl('', [Validators.required, Validators.pattern('((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9\?\=\-]*)?')]),
                emocion : this.frmEmocion,
                lugar : new FormControl('-1', Validators.min(0)),
                extra : new FormControl('')
            });
        }

    // EVENTOS
    // EVENTOS ANGULAR
    ngOnInit() {
        this.servicioEmociones.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta;
        });

        this.servicioLugares.getLugares().subscribe(respuesta => {
            this.lugares = respuesta;
        });
    }

    // EVENTOS PROPIOS
    onCambioSeleccionEmocionGeneral(emocionSeleccionada : any) {
        this.frmEmocion.controls['emocionEspecifica'].enable();
        
        this.emocionSeleccionada = this.emociones[emocionSeleccionada];

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
        this.frmCancion.reset();
            
        this.frmEmocion.controls['emocionEspecifica'].reset({
            value : '-1',
            disabled : true
        });
        this.frmEmocion.controls['emocionGeneral'].reset('-1');
        this.frmCancion.controls['lugar'].reset('-1');
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
}
