import { Injectable } from '@angular/core';
import * as config from '../../../assets/config.json';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    private urlBase : string = config.urlAPI;
    private urlBaseCancion : string = this.urlBase + "canciones/";
    private urlBaseReproductor : string = this.urlBaseCancion + "reproducir/";
    private urlBaseLugar : string = this.urlBase + "lugares/";
    private urlBaseEmocion : string = this.urlBase + "emociones/";

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
    getUrlBaseReproductor() : string {
        return this.urlBaseReproductor;
    }
    
    getUrlBaseEmocion() : string {
        return this.urlBaseEmocion;
    }
}
