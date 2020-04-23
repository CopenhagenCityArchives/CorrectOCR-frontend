import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  constructor() { }

  public getTokens(): string {
    return 'Yes it does!';
  }

}
