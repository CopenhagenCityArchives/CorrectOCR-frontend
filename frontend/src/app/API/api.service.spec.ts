import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { IToken } from '../components/tokens/i-token';
import { Token } from '../components/tokens/token';

describe('ApiService', () => {
  const url: string = 'http://localhost:5000/';
  let apiService: ApiService;
  let testJSON: JSON = require('../../test-helpers/testMainToken.json');
  let client: HttpClient;
  let controller: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ApiService, {provide: String, useValue: url}],
      imports: [ HttpClientTestingModule ]
    });

    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    controller.verify();
  })

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get oberservable containing expected doc-overview from getOverview() (HTTPClient called once)', () => {
    const testData: Array<Object> = [
      {'corrected': 2973, 'count': 3328, 'docid': "6148", 'url': "/6148/tokens.json"},
      {'corrected': 9999, 'count': 5555, 'docid': "1111", 'url': "/9999/tokens.json"}
    ];

    // Make an HTTP GET request
    apiService.getOverview().subscribe(data => {
      expect(data).toEqual(testData)
    });
    
    // The following `expectOne()` will match the request's URL
    const req = controller.expectOne(url);
    
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

  });

  it('should get specified token from getToken() (HTTPClient called once)', () => {
    const testData: IToken = new Token(testJSON);

    apiService.getToken(testData.doc_ID, testData.index).subscribe((data:JSON) => {
      const resToken = new Token(data);
      expect(resToken).toEqual(testData);
    });

    const req = controller.expectOne(url + testData.doc_ID + '/token-' + testData.index + '.json');
    expect(req.request.method).toEqual('GET');
    req.flush(testJSON);
  });

  it('should get expected specified Token from getTokenFromInfoUrl() (HTTPClient called once)', () => {
    const testData: IToken = new Token(testJSON);

     apiService.getTokenFromInfoUrl('/6148/token-6.json').toPromise().then((data:JSON) => {
      const resToken = new Token(data);
      expect(resToken).toEqual(testData);
    });
    
    const req = controller.expectOne(url + '/6148/token-6.json');
    expect(req.request.method).toEqual('GET');
    req.flush(testJSON);
  });

  it('should get expected list of tokens from getAllTokensFromDocId() (HTTPClient called once)', () => {
    const testData: Array<Object> = [
      {image_url: "/6148/token-6.png", info_url: "/6148/token-6.json", is_corrected: false, string: "La&s"},
      {image_url: "/6148/token-7.png", info_url: "/6148/token-7.json", is_corrected: false, string: "stter."},
      {image_url: "/6148/token-10.png", info_url: "/6148/token-10.json", is_corrected: false, string: "anskrør,"}
    ];

    apiService.getAllTokensFromDocId('6148').subscribe((data: Array<object>) => {
      expect(data).toEqual(testData);
    });

    const req = controller.expectOne(url + '6148' + '/tokens.json');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should get a token from getRandomToken() (HTTPClient called once)', () => {
    const testData: IToken = new Token(testJSON);
    apiService.getRandomToken().subscribe((data: JSON) => {
      const resToken: Token = new Token(data);
      expect(resToken).toEqual(testData);
    });
    const req = controller.expectOne(url + 'random');
    expect(req.request.method).toEqual('GET');
    req.flush(testJSON);
  });

  it('should get left token of given token from getLeftToken() (HTTPClient called once)', () => {
    const mainToken: IToken = new Token(testJSON);
    apiService.getLeftToken(mainToken).subscribe((data: JSON) => {
      const resToken: Token = new Token(data);
      expect(resToken.index).toEqual(mainToken.index - 1);
    });
    const req = controller.expectOne(url + mainToken.doc_ID + '/token-' + (mainToken.index - 1) + '.json');
    expect(req.request.method).toEqual('GET');
    req.flush(require('../../test-helpers/testLeftToken.json'));
  });

  it('should get right token of given token from getRightToken() (HTTPClient called once)', () => {
    const mainToken: IToken = new Token(testJSON);
    apiService.getRightToken(mainToken).subscribe((data: JSON) => {
      const resToken: Token = new Token(data);
      expect(resToken.index).toEqual(mainToken.index + 1);
    });
    const req = controller.expectOne(url + mainToken.doc_ID + '/token-' + (mainToken.index + 1) + '.json');
    expect(req.request.method).toEqual('GET');
    req.flush(require('../../test-helpers/testRightToken.json'));
  });

  it('should send post request when postHypernate() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    const hypDir: string = "left";
    apiService.postHypernate(mainToken, hypDir).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'));
    expect(req.request.method).toEqual('POST');
  })

  it('should send post request when postHypernate() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    const gold: string = "sol";
    apiService.postHypernate(mainToken, gold).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'));
    expect(req.request.method).toEqual('POST');
  })




});
