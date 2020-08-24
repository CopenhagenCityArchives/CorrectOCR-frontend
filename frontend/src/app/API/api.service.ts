import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../tokens/i-token'

const url = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  options: {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  public getOverview() {
    return this.http.get(url);
  }

  public getToken(token) {
    return this.http.get(url + token);
  }

  public getTokensFromDocId(doc_id) {
    return this.http.get(url + doc_id + '/tokens.json');
  }

  public getRandomToken() {
    return this.http.get(url + 'random', this.options);
  }

  public getLeftToken(mainToken: IToken) {
    return this.http.get(url + mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json', this.options);
  }

  public getRightToken(mainToken: IToken) {
    return this.http.get(url + mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json', this.options);
  }

  public postHypernate(mainToken: IToken, hypDir: string) {
    let body = {
      'hyphenate': hypDir
    };
    return this.http.request('POST', (url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }

  public postGold(mainToken: IToken, gold: string) {
    let body = {
      'gold': gold
    };
    return this.http.request('POST',(url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }
  
}
