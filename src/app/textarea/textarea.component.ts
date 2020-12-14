import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() _text: string;

  constructor() { }

  ngOnInit(): void {
  }


  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }
}
