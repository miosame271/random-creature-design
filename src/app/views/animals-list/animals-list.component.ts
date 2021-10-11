import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../../services/animals.service';
import { Animal } from '../../interfaces/types';

@Component({
    selector: 'animals-list',
    templateUrl: './animals-list.component.html',
    styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
    private list: string[] = []

    loading: boolean = false;
    randomThree: Animal[] = [];

    constructor(private animalService: AnimalsService) {
    }

    async ngOnInit(): Promise<void> {
        await this.getList();
        this.getRandomThree();
    }

    async getList(): Promise<void> {
        // debugger
        this.loading = true;
        this.list = await this.animalService.getAnimals();
        this.loading = false;
    }

    getRandomThree(): void {
        const limit = this.list.length;

        if (limit < 3) {
            this.randomThree = [];
            return;
        }

        const randomIndexes: number[] = Array
            .from({ length: limit }, () => Math.floor(Math.random() * limit))
            .slice(0, 3);

        this.randomThree = this.list
            .filter((item, index) => randomIndexes.includes(index))
            .map(item => ({
                id: item,
                ruTitle: item
            }));
    }

}

