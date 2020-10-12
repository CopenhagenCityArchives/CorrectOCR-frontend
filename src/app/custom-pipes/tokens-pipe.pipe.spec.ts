import { Token } from '../components/tokens/token';
import { TokensPipePipe } from './tokens-pipe.pipe';

describe('TokensPipePipe', () => {
  let pipe: TokensPipePipe;

  beforeEach(() => {
    pipe = new TokensPipePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null if provided with no value', () => {
    let testData:JSON;

    expect(pipe.transform(testData)).toBe(null);
  });

  it('should return a valid token when given valid JSON data', () => {
    const testJSON = require('../../test-helpers/testMainToken.json');
    expect(pipe.transform(testJSON)).toEqual(new Token(testJSON))
  });


});
