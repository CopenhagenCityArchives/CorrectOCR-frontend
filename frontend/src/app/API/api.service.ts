import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../components/tokens/i-token';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'http://localhost:5000/'
  private http: HttpClient;

  options: {
    responseType: 'json'
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get a list of documents
   *
   * @return  {Observable<Object>}[return Observable]
   */
  /*public getOverview(): Observable<Object> {
    return this.http.get(this.url);
  }*/

  /**
   * get a list of documents !HARDCODED!
   *
   * @return  {Observable<Object>}[return Observable]
   */
  public getOverview(): Observable<Object> {
    return of(require('../../test-helpers/testDoc_Overview.json'));
  }
  
  /**
   * Get a specific token
   *
   * @param   {number}              docid  id of document
   * @param   {number<Object>}      index  index of token
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getToken(docid:number, index:number): Observable<Object> {
    return this.http.get(this.url + docid + '/token-' + index + '.json');
  }

  public getTokenFromInfoUrl(infoUrl:string): Observable<Object> {
    return this.http.get(this.url + infoUrl);
  }

  /**
   * Get all tokens from given document id
   *
   * @param   {string}  docid  id of document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getAllTokensFromDocId(docid:string): Observable<Object> {
    return this.http.get(this.url + docid + '/tokens.json');
  }

  /**
   * Get a random token from a random document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getRandomToken(): Observable<Object> {
    return this.http.get(this.url + 'random', this.options);
  }

  /**
   * Get token with index-1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getLeftToken(mainToken: IToken): Observable<Object> {
    return this.http.get(this.url + mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json', this.options);
  }

  /**
   * Get token with index+1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getRightToken(mainToken: IToken): Observable<Object> {
    return this.http.get(this.url + mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json', this.options);
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
    return this.http.request('POST', (this.url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }

  /**
   * Update token with new gold value
   *
   * @param   {IToken}              mainToken  Main Token
   * @param   {string}              gold       new gold value
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public postGold(mainToken: IToken, gold: string): Observable<Object> {
    let body = {
      'gold': gold
    };
    return this.http.request('POST',(this.url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body});
  }
  
}
