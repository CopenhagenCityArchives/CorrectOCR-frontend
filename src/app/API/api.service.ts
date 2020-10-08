import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../components/tokens/i-token';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = environment.apiUrl;
  private http: HttpClient;

  options: {
    responseType: 'json',
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get a list of documents
   *
   * @return  {Observable<Object>}[return Observable]
   */
  public getOverview(): Observable<Object> {
    return this.http.get(this.url);
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
    return this.http.get(this.url + docid + '/token-' + index + '.json').pipe(
      retry(3),
    );
  }

  public getTokenFromInfoUrl(infoUrl:string): Observable<Object> {
    return this.http.get(this.url + infoUrl).pipe(
      retry(3),
    );
  }

  /**
   * Get all tokens from given document id
   *
   * @param   {string}  docid  id of document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  /*public getAllTokensFromDocId(docid:string): Observable<Object> {
    let doc_6000: Array<Object> = [
      {"image_url": "/6000/token-6.png",  "info_url": "/6148/token-6.json",  "is_corrected": false, "string": "La&s"},
      {"image_url": "/6000/token-7.png",  "info_url": "/6148/token-7.json",  "is_corrected": false, "string": "stter."},
      {"image_url": "/6000/token-10.png", "info_url": "/6148/token-10.json", "is_corrected": false, "string": "anskrør,"},
      {"image_url": "/6000/token-27.png", "info_url": "/6148/token-27.json", "is_corrected": false, "string": "lalet"},
      {"image_url": "/6000/token-30.png", "info_url": "/6148/token-30.json", "is_corrected": false, "string": "T^e."},
      {"image_url": "/6000/token-42.png", "info_url": "/6148/token-42.json", "is_corrected": false, "string": "idten."},
      {"image_url": "/6000/token-45.png", "info_url": "/6148/token-45.json", "is_corrected": false, "string": ":asse,"},
      {"image_url": "/6000/token-47.png", "info_url": "/6148/token-47.json", "is_corrected": false, "string": "raed"},
      {"image_url": "/6000/token-54.png", "info_url": "/6148/token-54.json", "is_corrected": false, "string": "lybninger."},
      {"image_url": "/6000/token-58.png", "info_url": "/6148/token-58.json", "is_corrected": false, "string": "paalimet"}
    ]
    let doc_6148: Array<Object> = [
      {"image_url": "/6148/token-62.png",  "info_url": "/6148/token-62.json",  "is_corrected": false, "string": "6,"},
      {"image_url": "/6148/token-71.png",  "info_url": "/6148/token-71.json",  "is_corrected": false, "string": "emmelig"},
      {"image_url": "/6148/token-73.png",  "info_url": "/6148/token-73.json",  "is_corrected": false, "string": "'09)."},
      {"image_url": "/6148/token-82.png",  "info_url": "/6148/token-82.json",  "is_corrected": false, "string": "«*|„"},
      {"image_url": "/6148/token-84.png",  "info_url": "/6148/token-84.json",  "is_corrected": false, "string": "6,"},
      {"image_url": "/6148/token-94.png",  "info_url": "/6148/token-94.json",  "is_corrected": false, "string": "Politløvrlgheder."},
      {"image_url": "/6148/token-100.png", "info_url": "/6148/token-100.json", "is_corrected": false, "string": "Murersvendene:"},
      {"image_url": "/6148/token-105.png", "info_url": "/6148/token-105.json", "is_corrected": false, "string": "Nepken,"},
      {"image_url": "/6148/token-137.png", "info_url": "/6148/token-137.json", "is_corrected": false, "string": "Gummerup,"},
      {"image_url": "/6148/token-167.png", "info_url": "/6148/token-167.json", "is_corrected": false, "string": "giverenke"}
    ]
    let doc_6500: Array<Object> = [
      {"image_url": "/6148/token-231.png", "info_url": "/6148/token-231.json", "is_corrected": false, "string": "Efternævnle"},
      {"image_url": "/6148/token-247.png", "info_url": "/6148/token-247.json", "is_corrected": false, "string": "Draaby"},
      {"image_url": "/6148/token-259.png", "info_url": "/6148/token-259.json", "is_corrected": false, "string": "hjemme­"},
      {"image_url": "/6148/token-265.png", "info_url": "/6148/token-265.json", "is_corrected": false, "string": "Lnursdotter"},
      {"image_url": "/6148/token-271.png", "info_url": "/6148/token-271.json", "is_corrected": false, "string": "hebruar"},
      {"image_url": "/6148/token-274.png", "info_url": "/6148/token-274.json", "is_corrected": false, "string": "Stabrand,"},
      {"image_url": "/6148/token-275.png", "info_url": "/6148/token-275.json", "is_corrected": false, "string": "Nødager"},
      {"image_url": "/6148/token-287.png", "info_url": "/6148/token-287.json", "is_corrected": false, "string": "Kjeldstrup"},
      {"image_url": "/6148/token-289.png", "info_url": "/6148/token-289.json", "is_corrected": false, "string": "tiggaard"},
      {"image_url": "/6148/token-295.png", "info_url": "/6148/token-295.json", "is_corrected": false, "string": "Politi­"}
    ]

    switch (docid) {
      case "6000":
        return of(doc_6000);
        break;
      
      case "6148":
        return of(doc_6148);
        break;

      case "6500":
        return of(doc_6500)
        break;
    }

  }*/
  
  public getAllTokensFromDocId(docid:string): Observable<Object> {
   return this.http.get(this.url + docid + '/tokens.json');
  }


  /**
   * Get a random token from a random document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getRandomToken(): Observable<Object> {
    return this.http.get(this.url + 'random');
  }

  public getTestToken(): Observable<Object> {
    return this.http.get('http://localhost:5000/6000/token-153.json');
  }

  /**
   * Get token with index-1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getLeftToken(mainToken: IToken): Observable<Object> {
    return this.http.get(this.url + mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json').pipe(
      retry(3),
    );
  }

  /**
   * Get token with index+1 of given token
   *
   * @param   {IToken<Object>}      mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public getRightToken(mainToken: IToken): Observable<Object> {
    return this.http.get(this.url + mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json').pipe(
      retry(3),
    );
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
