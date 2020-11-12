import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './api/url.service';

@Injectable({
    providedIn: 'root'
})
export class EmocionService {
    private emociones : EmocionGeneral[] = [];

    constructor(private _http : HttpClient, private _url : UrlService) { }
    
    getEmociones() : Observable<EmocionGeneral[]> {
        return this._http.get<EmocionGeneral[]>(this._url.getUrlBaseEmocion());
    }
}

export interface EmocionGeneral {
    id? : number;
    nombre : string;
    emociones : EmocionEspecifica[];
}

export interface EmocionEspecifica {
    id? : number;
    nombre : string;
}

export const EMOCION_ESPECIFICA_VACIA : EmocionEspecifica = {
    id : -1,
    nombre : ''
}

export const EMOCION_GENERAL_VACIA : EmocionGeneral = {
    id : -1,
    nombre : '',
    emociones : []
}