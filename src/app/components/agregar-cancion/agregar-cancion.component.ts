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
    frmAgregarCancion : FormGroup;
    frmEmocion : FormGroup;
    
    constructor(
        private servicio : CancionService,
        private servicioEmociones : EmocionService,
        private servicioLugares : LugarService,
        private router : Router,
        private route : ActivatedRoute,
        private formBuilder : FormBuilder) {
            // Form group emocion
            this.frmEmocion = this.formBuilder.group({
                emocionGeneral : new FormControl('', Validators.required),
                emocionEspecifica : new FormControl({
                    value : '',
                    disabled : true
                }, Validators.required)
            });

            // Main form group
            this.frmAgregarCancion = this.formBuilder.group({
                nombre : new FormControl('', Validators.required),
                origen : new FormControl('', Validators.required),
                url : new FormControl('', [Validators.required, Validators.pattern('((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9\?\=]*)?')]),
                emocion : this.frmEmocion,
                lugar : new FormControl('', Validators.required),
                extra : new FormControl('')
            });
        }

    // EVENTOS
    // EVENTOS ANGULAR
    ngOnInit() {
        this.getEmociones().subscribe(respuesta => {
            this.emociones = respuesta.content;
        });

        this.getLugares().subscribe(respuesta => {
            this.lugares = respuesta.content;
        });
    }

    // EVENTOS PROPIOS
    onCambioSeleccionEmocionGeneral(nombreEmocion : string) {
        this.frmEmocion.controls['emocionEspecifica'].enable();
        
        this.emocionSeleccionada = this.encontrarEmocionGeneralPorNombre(nombreEmocion);

        this.frmEmocion.controls['emocionEspecifica'].setValue('');
    }

    onSubmit(datosNuevaCancion : any) {

    }

    getEmociones() : Observable<any> {
        return this.servicioEmociones.getEmociones();
    }

    getLugares() : Observable<any> {
        return this.servicioLugares.getLugares();
    }

    encontrarEmocionGeneralPorNombre(nombreEmocion: string): EmocionGeneral {
        let emocion : EmocionGeneral;

        emocion = this.emociones.filter(e => e.nombre == nombreEmocion)[0];

        return emocion;
    }
}
