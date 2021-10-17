import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WikiService {

    constructor(private http: HttpClient) {
    }

    getAnimalInfo(animalTitle: string): Observable<Record<string, any>> {
        const url = `https://ru.wikipedia.org/w/api.php?action=parse&page=${ animalTitle }&format=json`;
        const headers = new HttpHeaders();

        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get(url, { headers });
    }
}
