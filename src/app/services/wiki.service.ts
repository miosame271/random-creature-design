import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class WikiService {
    private readonly _mainUrl = '/wiki/api.php?format=json&action=query';

    constructor(private http: HttpClient, private common: CommonService) {
    }

    getPageContents(animalTitle: string): Observable<Record<string, any>> {
        const url = `${ this._mainUrl }&prop=extracts&exintro&explaintext&exlimit=50&titles=${ animalTitle }`;

        return this.http.get(url, { headers: this.common.headers });
    }

    getPageImage(animalTitle: string): Observable<Record<string, any>> {
        const url = `${ this._mainUrl }&prop=pageimages&pithumbsize=500&titles=${ animalTitle }`;

        return this.http.get(url, { headers: this.common.headers });
    }
}
