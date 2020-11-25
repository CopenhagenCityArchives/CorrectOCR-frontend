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
  private solrUrl: string = environment.solrUrl; 
  private http: HttpClient;

  options: {
    responseType: 'json',
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  public handleError(error: HttpErrorResponse) {
    console.log("error hit");
    console.log(error);
    let errorMessage = 'Unknown error!'
    if (error.error instanceof ErrorEvent) {
      console.log("Client", error.error);
      // Client-side
      errorMessage = `Error: ${error.message}`
    } else {
      console.log("Server", error.error);
      // Server-side
      errorMessage = 
        `Error Code: ${error.status}
        Error Message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Get a list of documents
   *
   * @return  {Observable<Object>}[return Observable]
   */
  public getOverview(): Observable<Object> {
    return this.http.get(this.url).pipe(
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
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
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
  }

  public getTokenFromInfoUrl(infoUrl:string): Observable<Object> {
    return this.http.get(this.url + infoUrl).pipe(
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
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
    catchError(err => {
      return this.handleError(err);
    }),
    retry(3)
   )
  }


  /**
   * Get a random token from a random document
   *
   * @return  {Observable<Object>}         [return Observable]
   */
  public getRandomToken(): Observable<Object> {
    return this.http.get(this.url + 'random').pipe(
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
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
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
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
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
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
    return this.http.post(this.url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json', {body: body}).pipe(
      catchError(err => {
        return this.handleError(err);
      })
    )
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
    return this.http.post(this.url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json', body).pipe(
      catchError(err => {
        return this.handleError(err);
      })
    )
  }

  /**
   * [postGoldAndHypernate description]
   *
   * @param   {IToken}  mainToken   Main Token
   * @param   {string}  gold        new gold value
   * @param   {string}  hypDir      hypernate direction, either left or right
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public postGoldAndHypernate(mainToken: IToken, gold: string, hypDir: string): Observable<Object> {
    let body = { 'gold': gold, 'hyphenate': hypDir };
    return this.http.post(this.url +  mainToken.doc_ID + '/token-' + (mainToken.index) + '.json', body).pipe(
      catchError(err => {
        return this.handleError(err);
      })
    )
  }

  /**
   * [set token as discarded in db]
   *
   * @param   {IToken}              mainToken  Main Token
   *
   * @return  {Observable<Object>}             [return Observable]
   */
  public discardToken(mainToken: IToken): Observable<Object> {
    const body = {'discard':true};
     return this.http.post(this.url + mainToken.doc_ID + '/token-' + mainToken.index + '.json', body).pipe(
      catchError(err => {
        return this.handleError(err);
      })
    )
  }

  public getDocumentDate(docid: string): Observable<Object> {
    return this.http.get(`${this.solrUrl}select?wt=json&q=id:19-${docid}&fl=efterretning_date`).pipe(
      catchError(err => {
        return this.handleError(err);
      }),
      retry(3)
    )
  }

}
