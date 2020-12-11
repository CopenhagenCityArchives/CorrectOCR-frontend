import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { IToken } from '../components/tokens/i-token';
import { Token } from '../components/tokens/token';
import { environment } from '../../environments/environment';

const url: string = environment.apiUrl;
const solrUrl: string = environment.solrUrl;
let apiService: ApiService;
let testJSON: JSON = require('../../test-helpers/testMainToken.json');
const testUserData = JSON.stringify({"email": "test@test.com", "name": "Tester", "APACS": "69420" });
let client: HttpClient;
let controller: HttpTestingController;

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
    apiService.postHypernate(mainToken, hypDir, testUserData).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'));
    expect(req.request.method).toEqual('POST');
  })

  it('should send post request when postGold() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    const gold: string = "sol";
    apiService.postGold(mainToken, gold, testUserData).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + (mainToken.index) + '.json'));
    expect(req.request.method).toEqual('POST');
  });

  it('should send post request when discardToken() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    apiService.discardToken(mainToken, testUserData).subscribe((data:JSON) => {
      const resToken: Token = new Token(data);
    });
    const req = controller.expectOne((url + mainToken.doc_ID + '/token-' + mainToken.index + '.json'));
    expect(req.request.method).toEqual('POST');
  })

  it('should send get request when getDocumentDate() is called', () => {
    const mainToken: IToken = new Token(testJSON);
    apiService.getDocumentDate('6148').subscribe((data) => {
      const res = data;
      expect(res).toEqual('something');
    });
    const req = controller.expectOne(`${solrUrl}select?wt=json&q=id:19-6148&fl=efterretning_date`);
    expect(req.request.method).toEqual('GET');
    req.flush('something');
  })

}

function catchingErrors() {

  const testToken = new Token(require('../../test-helpers/testMainToken.json'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ApiService, {provide: String, useValue: url}],
      imports: [ HttpClientTestingModule ]
    });

    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);

  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should catch Client Error in getOverview()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: 'http://localhost:5000/', status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getOverview().subscribe();
    controller.expectOne(url).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getOverview()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getOverview().subscribe();
    controller.expectOne(url).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse))
  })

  it('should catch Client Error in getToken()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/420/token-69.json", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getToken(420, 69).subscribe();
    controller.expectOne(`${url}420/token-69.json`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getToken()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/420/token-69.json"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getToken(420, 69).subscribe();
    controller.expectOne(`${url}420/token-69.json`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getTokenFromInfoUrl()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/6148/token-0.json", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getTokenFromInfoUrl('6148/token-0.json').subscribe();
    controller.expectOne(`${url}6148/token-0.json`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getTokenFromInfoUrl()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/6148/token-0.json"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getTokenFromInfoUrl('6148/token-0.json').subscribe();
    controller.expectOne(`${url}6148/token-0.json`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getAllTokensFromDocId()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/6148/tokens.json", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getAllTokensFromDocId('6148').subscribe();
    controller.expectOne(`${url}6148/tokens.json`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getAllTokensFromDocId()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/6148/tokens.json"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getAllTokensFromDocId('6148').subscribe();
    controller.expectOne(`${url}6148/tokens.json`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getRandomToken()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/random", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getRandomToken().subscribe();
    controller.expectOne(`${url}random`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getRandomToken()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/random"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getRandomToken().subscribe();
    controller.expectOne(`${url}random`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getLeftToken()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/6148/token-330.json", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getLeftToken(testToken).subscribe();
    controller.expectOne(`${url}6148/token-330.json`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getLeftToken()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/6148/token-330.json"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getLeftToken(testToken).subscribe();
    controller.expectOne(`${url}6148/token-330.json`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getRightToken()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: "http://localhost:5000/6148/token-332.json", status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getRightToken(testToken).subscribe();
    controller.expectOne(`${url}6148/token-332.json`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getRightToken()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: "http://localhost:5000/6148/token-332.json"};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getRightToken(testToken).subscribe();
    controller.expectOne(`${url}6148/token-332.json`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

  it('should catch Client Error in getDocumentDate()', () => {
    const mockErrorInit = { error: new ErrorEvent('network error'), statusText: 'Bad Request', url: `${solrUrl}select?wt=json&q=id:19-6148&fl=efterretning_date`, status: 0 }
    const mockErrorResponse = { status: 0, statusText: 'Bad Request' };
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getDocumentDate('6148').subscribe();
    controller.expectOne(`${solrUrl}select?wt=json&q=id:19-6148&fl=efterretning_date`).error(new ErrorEvent('network error'), mockErrorResponse);

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorInit));
  })

  it('should catch Server Error in getDocumentDate()', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found', url: `${solrUrl}select?wt=json&q=id:19-6148&fl=efterretning_date`};
    const spyHandleError = spyOn(apiService, 'handleError').and.callThrough();

    apiService.getDocumentDate('6148').subscribe();
    controller.expectOne(`${solrUrl}select?wt=json&q=id:19-6148&fl=efterretning_date`).flush(null, { status: 404, statusText: 'Not Found' })

    expect(spyHandleError).toHaveBeenCalledTimes(1);
    expect(spyHandleError).toHaveBeenCalledWith(new HttpErrorResponse(mockErrorResponse));
  })

}
