import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private readonly _headers: HttpHeaders;

    get headers() {
        return this._headers;
    }

    constructor() {
        this._headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent"
        });
    }
}
