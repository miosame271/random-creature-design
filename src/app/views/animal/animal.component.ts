import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/types';

@Component({
    selector: 'animal',
    templateUrl: './animal.component.html',
    styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
    @Input() animal!: Animal;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.animal)
    }


}
