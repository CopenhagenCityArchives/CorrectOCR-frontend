import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tokens } from '../../testData/tokens';
import { TokensService } from '../tokens.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.scss']
})
export class TokenDetailsComponent implements OnInit {
  leftToken;
  mainToken;
  rightToken;
  json;
  url;
  constructor(private route: ActivatedRoute, private TokensService: TokensService, private ApiService: ApiService) {
   
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.leftToken = tokens[(+params.get('tokenDocId')-1)];
        this.mainToken = tokens[+params.get('tokenDocId')];
        this.rightToken = tokens[(+params.get('tokenDocId')+1)];
        this.url = 'localhost:5000';
        this.ApiService.getRandomToken().subscribe((data) => {
          console.log('data: ');
          console.log(data);
          this.json = data;
        });
        this.ApiService.getAllTokens().subscribe((data) => {
          console.log('data2: ');
          console.log(data);
        });
    })
  }

  hypLeft(): void {
    window.alert('Hypernate to left token...');
  }

  hypRight(): void {
    window.alert('Hypernate to right token...');
  }
}
