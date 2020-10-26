import {Component, OnInit} from '@angular/core';
import {TextGeneratorService} from '../_services/text-generator.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
})
export class GameWindowComponent implements OnInit {
  set gameEnded(value: boolean) {
    this._gameEnded = value;
  }
  private _text: string;
  private _textArr: Array<string>;
  private _input: string;
  private _gameStarted: boolean;
  private _gameEnded: boolean;
  private countDown: Subscription;
  private _counter = 60;
  private wordCount: number;
  private result: string;
  private tick = 1000;

  constructor(
    private textGenerator: TextGeneratorService
  ) {
    this.wordCount = 0;
  }

  ngOnInit(): void {
    this.getRandomText();
  }

  startTimer() {
    this.countDown = timer(0, this.tick)
      .subscribe(() => {
        if (this._counter === 0) {
          this._gameEnded = true;
          this.result = this.wordCount + '';
        } else {
          --this._counter;
        }
    });
  }

  startGame() {
    if (!this._gameStarted) {
      this._gameStarted = true;
      this.startTimer();
    }
  }

  public getRandomText(): void {
    this.textGenerator.getRandomText(200)
      .subscribe(response => {
        this._text = response.text_out.replace(/<[^>]+>/g, '');
        this._textArr = this.text.split(' ');
        this._text = this._textArr.slice(0, 24).join(' ').concat('..');
      });
  }

  public processInput(): void {
    if (this._textArr[0] && !this.gameEnded) {
      if (this._textArr[0] + ' ' === this.input) {
        this._textArr.shift();
        this.text = this._textArr.slice(0, 24).join(' ').concat('..');
        this.input = '';
        this.wordCount++;
      }
    }
  }

  public restart(): void {
    this.countDown.unsubscribe();
    this.getRandomText();
    this.gameEnded = false;
    this.gameStarted = false;
    this.wordCount = 0;
    this.counter = 60;
    this.input = '';
  }


  set counter(value: number) {
    this._counter = value;
  }

  set gameStarted(value: boolean) {
    this._gameStarted = value;
  }

  set text(value: string) {
    this._text = value;
  }

  get text(): string {
    return this._text;
  }


  get input(): string {
    return this._input;
  }

  set input(value: string) {
    this._input = value;
  }


  get counter(): number {
    return this._counter;
  }


  get gameStarted(): boolean {
    return this._gameStarted;
  }

  get gameEnded(): boolean {
    return this._gameEnded;
  }
}
