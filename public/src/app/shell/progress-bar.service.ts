import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class ProgressBarService {
  load = 0;
  progressEmitter: EventEmitter<boolean>;
  constructor() {
    this.progressEmitter = new EventEmitter();
  }
  inc(i = 1) {
    if ( this.load === 0) {
      this.progressEmitter.emit(true);
    }
    this.load += i;
    return this.load;
  }
  dec(i = 1) {
    this.load -= i;
    if (this.load === 0) {
      this.progressEmitter.emit(false);
    }
    return this.load;
  }
}
