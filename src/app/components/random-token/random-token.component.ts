import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../API/api.service';
import { Token } from '../tokens/token';

@Component({
  selector: 'app-random-token',
  templateUrl: './random-token.component.html',
  styleUrls: ['./random-token.component.scss']
})
export class RandomTokenComponent implements OnInit {
  randomToken: Token;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRandomToken();
  }

  getRandomToken() {
    this.apiService.getRandomToken().subscribe((data: JSON) => {
      this.randomToken = new Token(data);
    });
  }

}

