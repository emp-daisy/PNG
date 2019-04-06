import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhonenumberService {
  constructor(private http: HttpClient) {}

  getAllNumbers(sort: string) {
    return this.http.get(`/api/phonenumber/?sort=${sort}`);
  }
  generateNumber(limit: number, sort: string) {
    return this.http.get(`/api/phonenumber/generate/?sort=${sort}&limit=${limit}`);
  }
}
