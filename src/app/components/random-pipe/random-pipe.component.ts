import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ApiService } from 'src/app/API/api.service';
import { Token } from '../tokens/token';

@Component({
  selector: 'app-random-pipe',
  templateUrl: './random-pipe.component.html',
  styleUrls: ['./random-pipe.component.scss']
})
export class RandomPipeComponent implements OnInit {

  randomToken$: Observable<Object>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRandomToken();
  }

  getRandomToken() {
    this.randomToken$ = this.apiService.getRandomToken().pipe(share());
  }

}
