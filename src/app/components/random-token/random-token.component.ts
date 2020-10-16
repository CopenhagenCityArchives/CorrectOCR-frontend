
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';

@Component({
  selector: 'app-random-token',
  templateUrl: './random-token.component.html',
  styleUrls: ['./random-token.component.scss']
})
export class RandomTokenComponent implements OnInit {
  randomToken$: Observable<Object>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRandomToken();
  }

  getRandomToken() {
    this.randomToken$ = this.apiService.getRandomToken().pipe(share());
  }

}