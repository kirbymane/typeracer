import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class TextParserService {

  public static parseText(text): string {
    return text.replace(/<[^>]+>/g, '');
  }

  public static minimiseText(text: string[]): string {
    return text.slice(0, 24).join(' ').concat('..');
  }
}
