import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './api/url.service';
import { EmocionEspecifica } from './emocion-especifica.service';
import { Lugar } from './lugar.service';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
    private canciones : Cancion[] = [];

    constructor(private _http : HttpClient, private _url : UrlService) { }

    get(params? : HttpParams) : Observable<any> {
        return this._http.get<Cancion[]>(this._url.getUrlBaseCancion(), {params : params});
    }

    reproducir(cancionId : number) : any {
        return this._http.get<any>(this._url.getUrlBaseReproductor() + cancionId.toString());
    }
}

export interface Cancion {
    id? : number;
    nombre : string;
    link : string;
    origen : string;
    emocion : EmocionEspecifica;
    lugar : Lugar;
    extras : string;
}