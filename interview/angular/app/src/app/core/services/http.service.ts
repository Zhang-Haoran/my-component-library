import { Injectable } from "@angular/core"
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, of } from "rxjs"

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    // return this.http.get('');
    return of(['VIC', 'NSW', 'QLD', 'TAS', 'SA', 'WA', 'ACT']);
  }
  getData1(): Observable<any> {
    // return this.http.get('');
    return from(['VIC', 'NSW', 'QLD', 'TAS', 'SA', 'WA', 'ACT']);
  }
}