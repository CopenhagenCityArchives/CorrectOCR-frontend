import { Component, OnInit } from '@angular/core';
import { tokens } from '../../testData/tokens';
@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  tokens = tokens;
  constructor() { }

  ngOnInit(): void {
  }

}
