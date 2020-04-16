import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tokens } from '../../testData/tokens';


@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.scss']
})
export class TokenDetailsComponent implements OnInit {
  leftToken;
  mainToken;
  rightToken;
  constructor( private route: ActivatedRoute) {
   
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.leftToken = tokens[(+params.get('tokenDocId')-1)];
        this.mainToken = tokens[+params.get('tokenDocId')];
        this.rightToken = tokens[(+params.get('tokenDocId')+1)];
    })
  }

  hypLeft(): void {
    window.alert('Hypernate to left token...');
  }

  hypRight(): void {
    window.alert('Hypernate to right token...');
  }
}
