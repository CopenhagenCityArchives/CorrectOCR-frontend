import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { IToken } from '../components/tokens/i-token';
import { Token } from '../components/tokens/token';
import { environment } from '../../environments/environment';
import { catchError, map, share } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

const url: string = environment.apiUrl;
let apiService: ApiService;
let testJSON: JSON = require('../../test-helpers/testMainToken.json');
let client: HttpClient;
let controller: HttpTestingController;
// let httpClientSpy: { getOverview: jasmine.Spy, handleError: jasmine.Spy};

//Run Tests
describe('ApiService', () => {
  describe('with successful fetching', successfulFetching);
  describe('with handleErrors', catchingErrors);
})

function successfulFetching() {
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

  it('should send post request when postGold() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    const gold: string = "sol";
    apiService.postGold(mainToken, gold).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'));
    expect(req.request.method).toEqual('POST');
  });

  it('should send post request when discardToken() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    apiService.discardToken(mainToken).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + mainToken.index + '.json'));
    expect(req.request.method).toEqual('POST');
  })

}

function catchingErrors() {

  const mockErrorInit = {
    error: new Error('network error'),
    message: 'shit happend',
    lineno: 69,
    colno: 420,
    filename: 'veryReal.html'
  }
  const errorRequestMock = new ErrorEvent('MockError', mockErrorInit);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ApiService, {provide: String, useValue: url}],
      imports: [ HttpClientTestingModule ]
    });

    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
    // httpClientSpy = jasmine.createSpyObj('apiService', ['handleError', 'getOverview']);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    // controller.verify();
  })

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  // it('should catch error in getOverview() when met with a network error', () => {
  //   console.log("HELP")
  //   apiService.handleError = jasmine.createSpy('handleError spy').and.callThrough();
  //   apiService.getOverview().subscribe();
  //   console.log("HELP")

  //   const req = controller.expectOne(url);
  //   req.error(errorRequestMock, {status: 404, statusText: 'network error'});
  //   console.log("HELP")

  //   expect(apiService.handleError).toHaveBeenCalledTimes(1);
  //   console.log("HELP")

  //   // req.flush(source, {status: 404, statusText: 'network error'});
  //   // expect(req.request.method).toEqual('GET');

  // })

}
