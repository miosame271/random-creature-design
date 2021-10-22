import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

import { AnimalsService, WikiService } from '../../services';

import type { Animal } from '../../interfaces/types';
import { map } from 'rxjs/operators';

@Component({
    selector: 'animals-list',
    templateUrl: './animals-list.component.html',
    styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
    private list: string[] = [];

    randomThreeIds: string[] = [];
    randomThreeAnimals$: Observable<Animal[]> = of([]);

    constructor(private animalService: AnimalsService, private wikiService: WikiService) {
    }

    async ngOnInit(): Promise<void> {
        await this.getList();
    }

    async generateRandomThree(): Promise<void> {
        await this.getRandomThree();
    }

    async getList(): Promise<void> {
        this.list = await this.animalService.getAnimals();
    }

    async getRandomThree(): Promise<void> {
        const limit = this.list.length;

        // обнуляем предыдущее значение
        this.randomThreeIds = [];

        // нет смысла в поиске рандомных значений, если список слишком короткий
        if (limit < 3) {
            return;
        }

        // функция возвращает рандомный айдишник
        const getRandom = (): number => {
            const randomIndex = Math.floor(Math.random() * limit);

            // исключаем несуществующие индексы и те, что уже есть в выборке
            if (this.list[randomIndex] && !this.randomThreeIds[randomIndex]) {
                return randomIndex;
            }

            return getRandom();
        }

        // наполняем массив айдишников
        for (const item of Array.from({length: 3})) {
            const index = getRandom();
            const id = this.list[index];

            // добавляем по одному, исключая возможность повтора
            this.randomThreeIds.push(id);
        }

        // наполняем массив объектов с данными о животных
        this.randomThreeAnimals$ = combineLatest(this.randomThreeIds.map(id => {
            const animalInfo = combineLatest([
                this.wikiService.getPageContents(id),
                this.wikiService.getPageImage(id)
            ]);

            return animalInfo.pipe(map((values) => {
                const result: Animal = {
                    title: id
                };

                values.forEach((value) => {
                    const pages: Record<string, any> = value.query.pages;

                    // данных нет - возвращаем только title
                    if (!pages || !Object.keys(pages).length) {
                        return;
                    }

                    const data: Record<string, any> = Object.values(pages)[0];

                    if (data.extract) {
                        result.text = `${ data.extract.slice(0, 100) }...`;
                    }

                    if (data.thumbnail) {
                        result.image = data.thumbnail.source;
                    }
                });

                return result;
            }));
        }));
    }
}

