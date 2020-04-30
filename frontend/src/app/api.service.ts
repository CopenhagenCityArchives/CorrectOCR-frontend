import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from './tokens/i-token'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

const url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getToken(token) {
    let json;
    json = this.http.get(url + token)
    return json;
  }

  public getAllTokens() {
    let json;
    json = this.http.get(url + '/6148/tokens.json');
    return json;
  }

  public getRandomToken() {
    let json;
    json = this.http.get(url + '/random');
    return json;
  }

  public getLeftToken(mainToken: IToken) {
    let json;
    console.log(mainToken);
    json = this.http.get(url + '/' +  mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json');
    return json;
  }

  public getRightToken(mainToken: IToken) {
    let json;
    json = this.http.get(url + '/' +  mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json');
    return json;
  }

  public postHypernate(mainToken: IToken, hypDir: string) {
    let response;
    let body = {
      'hypernate': hypDir
    };
    response = this.http.request('POST',(url + '/' +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
    return response;
  }

  public postGold(mainToken: IToken, gold: string) {
    let response;
    let body = {
      'gold': gold
    };
    response = this.http.request('POST',(url + '/' +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
    return response;
  }

  
}
