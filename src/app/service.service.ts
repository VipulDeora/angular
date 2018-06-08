import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Service {

  constructor(private http: HttpClient) {}

  getLocations () {
    return this.http.get<any>('Your API');
  }
}
