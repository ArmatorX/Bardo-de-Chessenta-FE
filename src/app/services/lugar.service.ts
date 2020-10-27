import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor() { }
}

export interface Lugar {
    id? : number;
    nombre : string;
}