import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Output() gameEnded = new EventEmitter();
  private tick = 1000;
  private countDown: Subscription;
  private _counter = 5;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  public startTimer(): void {
    this.countDown = timer(0, this.tick)
      .subscribe(() => {
        if (this.counter === 0) {
          this.gameEnded.emit(true);
        } else {
          --this.counter;
        }
      });
  }


  get counter(): number {
    return this._counter;
  }

  set counter(value: number) {
    this._counter = value;
  }
}
