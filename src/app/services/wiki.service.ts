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
        const url = `/wiki/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exlimit=50&titles=${ animalTitle }`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent"
        });

        return this.http.get(url, { headers });
    }
}
