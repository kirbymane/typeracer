import {Component, OnInit} from '@angular/core';
import {TextGeneratorService} from '../_services/text-generator.service';
import {Subscription, timer} from 'rxjs';
import {TextParserService} from '../_services/text-parser.service';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.css']
})
export class GameWindowComponent implements OnInit {
  private _text: string;
  private _textArr: Array<string>;
  private _input: string;
  private _gameStarted: boolean;
  private _gameEnded: boolean;
  private wordCount: number;
  private result: number;
  private _inputClass: string;

  constructor(
    private textGenerator: TextGeneratorService
  ) {
    this.wordCount = 0;
  }

  ngOnInit(): void {
    this.getRandomText();
  }

  startGame(): void {
    if (!this._gameStarted) {
      this._gameStarted = true;
    }
  }

  endGame(gameEnded): void {
    this.gameEnded = gameEnded;
    this.gameStarted = false;
    this.result = this.wordCount;
    this.inputClass = '';
  }

  public getRandomText(): void {
    this.textGenerator.getRandomText(200)
      .subscribe(response => {
        this._text = TextParserService.parseText(response.text_out);
        this._textArr = this.text.split(' ');
        this._text = TextParserService.minimiseText(this.textArr);
      });
  }

  public processInput(): void {
    if (this.textArr[0] && !this.gameEnded) {
      if (!this.gameStarted) {
        this.gameStarted = true;
      }

      if (this.textArr[0] + ' ' === this.input) {
        this.textArr.shift();
        this.text = this.textArr.slice(0, 24).join(' ').concat('..');
        this.input = '';
        this.wordCount++;
      } else {
        for (let i = 0; i < this.input.split('').length; i++) {
          if (this.textArr[0].split('')[i] !== this.input.split('')[i]) {
            this.inputClass = 'bg-danger';
          } else {
            this.inputClass = '';
          }
        }
      }
    }
  }

  public restart(): void {
    this.getRandomText();
    this.wordCount = 0;
    this.input = '';
    this.gameEnded = false;
  }


  get gameEnded(): boolean {
    return this._gameEnded;
  }

  set gameEnded(value: boolean) {
    this._gameEnded = value;
  }

  set gameStarted(value: boolean) {
    this._gameStarted = value;
  }

  get gameStarted(): boolean {
    return this._gameStarted;
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


  get textArr(): Array<string> {
    return this._textArr;
  }

  set textArr(value: Array<string>) {
    this._textArr = value;
  }


  get inputClass(): string {
    return this._inputClass;
  }

  set inputClass(value: string) {
    this._inputClass = value;
  }
}
