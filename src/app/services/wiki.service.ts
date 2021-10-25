import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.prod';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Injectable({
    providedIn: 'root'
})
export class WikiService {
    private readonly _mainUrl = environment.production
        ? 'https://en.wikipedia.org/w/wiki/api.php?format=json&action=query'
        : '/wiki/api.php?format=json&action=query';
    private readonly _headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this._headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent"
        });
    }

    getPageContents(animalTitle: string): Observable<Record<string, any>> {
        console.log(this._mainUrl)

        const url = `${ this._mainUrl }&prop=extracts&exintro&explaintext&exlimit=50&titles=${ animalTitle }`;

        return this.http.get(url, { headers: this._headers });
    }

    getPageImage(animalTitle: string): Observable<Record<string, any>> {
        const url = `${ this._mainUrl }&prop=pageimages&pithumbsize=500&titles=${ animalTitle }`;

        return this.http.get(url, { headers: this._headers });
    }
}
