import { Injectable } from '@angular/core';
import { Observable, merge, of, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
@Injectable()
export class internetComponent {
    public online$: Observable<boolean>;
    public internet: boolean;
    constructor() {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
        );
        this.networkStatus();
    }
    public networkStatus() {
        this.online$.subscribe(value => {
            this.internet = value;
            console.log(this.internet);
        });
    }
    public internetGetStatus() {
        return this.internet;
    }
}