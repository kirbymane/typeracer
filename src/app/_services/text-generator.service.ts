import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextGeneratorService {
  API_URL = 'https://www.randomtext.me/api/gibberish/';

  constructor(
    private http: HttpClient
  ) { }

  getRandomText(wordCount: number): Observable<any> {
    return this.http.get(this.API_URL + 'p-1/100-' + wordCount).pipe();
  }
}

