import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class ApiServices {
  constructor(private http: HttpClient) {
  }
  submitRequest(token: string, req: any) {
    const t = 'bearer ' + token;
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': t
      })
    };
    return this.http.post<any>('http://sfa.demoplatform.simplifii.com/api/v1/cards', req, options)
      .map((value: any) => {
        return value;
      });
  }
}
