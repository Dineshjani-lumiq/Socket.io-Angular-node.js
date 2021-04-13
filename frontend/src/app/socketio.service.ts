
import { Injectable } from "@angular/core";

import * as io from 'socket.io-client';                 //npm install with type

import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class WebSocketService {
    socket: any;

    constructor() {
        this.socket = io('http://localhost:3009');
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data:any) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }
}