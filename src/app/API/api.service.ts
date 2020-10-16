import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IToken } from '../components/tokens/i-token';
import { Observable, of, throwError } from 'rxjs';
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      "an error occurred: ", error.error.message);
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
      catchError(this.handleError)
    );
  }

  public getTokenFromInfoUrl(infoUrl:string): Observable<Object> {
    return this.http.get(this.url + infoUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Get all tokens from given document id
   *
   * @param   {string}  docid  id of document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  
  public getAllTokensFromDocId(docid:string): Observable<Object> {
   return this.http.get(this.url + docid + '/tokens.json').pipe(
     retry(3),
     catchError(this.handleError)
   );
  }


  /**
   * Get a random token from a random document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getRandomToken(): Observable<Object> {
    return this.http.get(this.url + 'random').pipe(
      retry(3),
      catchError(this.handleError)
    );
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
      catchError(this.handleError)
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
      catchError(this.handleError)
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
    let body = { 'hyphenate': hypDir };
    return this.http.request('POST', (this.url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body}).pipe(
      catchError(this.handleError)
    );
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
    let body = { 'gold': gold };
    return this.http.request('POST',(this.url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'), {body: body}).pipe(
      catchError(this.handleError)
    );
  }
  
}
