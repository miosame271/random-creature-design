import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../../services/animals.service';
import { Animal } from '../../interfaces/types';
import { WikiService } from '../../services/wiki.service';

@Component({
    selector: 'animals-list',
    templateUrl: './animals-list.component.html',
    styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
    private list: string[] = []

    loading: boolean = false;
    randomThree: Animal[] = [];

    constructor(private animalService: AnimalsService, private wikiService: WikiService) {
    }

    async ngOnInit(): Promise<void> {
        this.loading = true;

        await this.getList();
        await this.getRandomThree();
    }

    async generateRandomThree(): Promise<void> {
        this.loading = true;

        await this.getRandomThree();
    }

    async getList(): Promise<void> {
        this.list = await this.animalService.getAnimals();
    }

    async getRandomThree(): Promise<void> {
        const limit = this.list.length;

        // обнуляем предыдущее значение
        this.randomThree = [];

        // нет смысла в поиске рандомных значений, если список слишком короткий
        if (limit < 3) {
            return;
        }

        const newArr = [];
        const getRandom = (): number => {
            const randomIndex = Math.floor(Math.random() * limit);

            // исключаем несуществующие индексы и те, что уже есть в выборке
            if (this.list[randomIndex] && !this.randomThree[randomIndex]) {
                return randomIndex;
            }

            return getRandom();
        }

        for (const item of Array.from({length: 3})) {
            const index = getRandom();
            const id = this.list[index];

            // добавляем по одному, исключая возможность повтора
            newArr.push({id});
        }

        // @ts-ignore
        this.randomThree = newArr.map((item) => {
            return this.wikiService.getAnimalInfo(item.id).subscribe((result) => {
                const info: any = Object.values(result.query.pages)[0];

                return {
                    id: item.id,
                    title: info.title,
                    text: info.extract
                }
            });
        })

        this.loading = false;
    }

}

