import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../tokens/i-token'
import { Observable } from 'rxjs';

const url = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  options: {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  /**
   * Get a list of documents
   *
   * @return  {Observable<Object>}[return Observable]
   */
  public getOverview() {
    return this.http.get(url);
  }
  
  /**
   * Get a specific token
   *
   * @param   {string}              docid  id of document
   * @param   {number<Object>}      index  index of token
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getToken(docid:string, index:number): Observable<Object> {
    return this.http.get(url + docid + '/token-' + index + '.json');;
  }

  /**
   * Get all tokens from given document id
   *
   * @param   {string}  docid  id of document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getTokensFromDocId(docid:string): Observable<Object> {
    return this.http.get(url + docid + '/tokens.json');
  }

  /**
   * Get a random token from a random document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getRandomToken(): Observable<Object> {
    return this.http.get(url + 'random', this.options);
  }

  /**
   * Get token with index-1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getLeftToken(mainToken: IToken): Observable<Object> {
    return this.http.get(url + mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json', this.options);
  }

  /**
   * Get token with index+1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getRightToken(mainToken: IToken): Observable<Object> {
    return this.http.get(url + mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json', this.options);
  }

  /**
   * Hypernate main token in givne direction
   *
   * @param   {IToken}              mainToken  Main Token
   * @param   {string<Object>}      hypDir     hypernate direction, either left or right
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public postHypernate(mainToken: IToken, hypDir: string): Observable<Object> {
    let body = {
      'hyphenate': hypDir
    };
    return this.http.request('POST', (url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }

  /**
   * Update token with new gold value
   *
   * @param   {IToken}              mainToken  Main Token
   * @param   {string<Object>}      gold       new gold value
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public postGold(mainToken: IToken, gold: string): Observable<Object> {
    let body = {
      'gold': gold
    };
    return this.http.request('POST',(url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }
  
}
