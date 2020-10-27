import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
    private urlBase : string = "http://localhost:8080/";
    private urlBaseCancion : string = this.urlBase + "canciones/";
    private urlBaseReproductor : string = this.urlBaseCancion + "reproducir/";
    private urlBaseLugar : string = this.urlBase + "lugar/";
    private urlBaseEmocionEspecifica : string = this.urlBase + "emociones-especificas/";

    constructor() { }

    getUrlBase() : string {
        return this.urlBase;
    }

    getUrlBaseCancion() : string {
        return this.urlBaseCancion;
    }

    getUrlBaseLugar() : string {
        return this.urlBaseLugar;
    }

    getUrlBaseEmocionEspecifica() : string {
        return this.urlBaseEmocionEspecifica;
    }

    getUrlBaseReproductor() : string {
        return this.urlBaseReproductor;
    }
}
