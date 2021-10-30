import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class AnimalsService {
    private readonly _mainUrl: string = 'http://localhost:3000/animals-api';

    constructor(private http: HttpClient, private common: CommonService) {
    }

    getAnimals(): Observable<string[]> {
        // @ts-ignore
        return this.http.get(`${ this._mainUrl }/animals`, { headers: this.common.headers });
    }
}
