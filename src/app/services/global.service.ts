import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private static defaultLanguage: string = 'pt';
  get DefaultLanguage(){
    return GlobalService.defaultLanguage;
  }
  set DefaultLanguage(value: string) {
    GlobalService.defaultLanguage = value;
  }

  constructor() { }
}
