import { Pipe, PipeTransform } from '@angular/core';
import { Token } from '../components/tokens/token';

@Pipe({
  name: 'tokensPipe'
})
export class TokensPipePipe implements PipeTransform {

  transform(value:JSON): Token {
    if(value != null) {
      const token = new Token(value);
      return token;
    }
    return null;
  }

}
