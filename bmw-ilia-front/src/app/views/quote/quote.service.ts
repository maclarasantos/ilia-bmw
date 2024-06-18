import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  postPerson(person: {
    name: string;
    mail: string;
    cellphone: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, person, { headers });
  }

  getPersonByMail(mail: String): Observable<any> {
    return this.http.get<any>('http://localhost:8080/person/' + mail);
  }

  getQuotesByMail(mail: String): Observable<any> {
    return this.http.get<any>('http://localhost:8080/quote/' + mail);
  }

  sendQuote(quote: Object): Observable<any> {
    var url = 'http://localhost:8080/quote';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(url, quote, { headers: headers });
  }

  deleteQuote(id: String) {
    return this.http.delete('http://localhost:8080/quote/' + id);
  }
}
