import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../API/api.service';

@Pipe({
  name: 'asyncTimestamp'
})
export class AsyncTimestampPipe implements PipeTransform {
  private apiService: ApiService;
  constructor(service: ApiService) { 
    this.apiService = service;
  }

  transform(value: string) {
    let returnValue: any = value
    
    if(value != null) {
      let date = this.getDate(value);
      returnValue = date;
    }
    return returnValue;
  }

  public getDate(docid: string): Observable<Object> {
    let date$ = this.apiService.getDocumentDate(docid);
    return date$;
  }

}
