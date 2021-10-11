import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AnimalsListComponent } from './views/animals-list/animals-list.component';
import { AnimalComponent } from './views/animal/animal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        AnimalsListComponent,
        AnimalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([
            {path: '', component: AppComponent}
        ]),
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
