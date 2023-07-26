import {Component} from '@angular/core';
import {UrlService} from "./url.service";
import {Observable, throwError} from "rxjs";
import {UrlKey} from "../models/url-key";

@Component({
  selector: 'app-shorten-url',
  templateUrl: './shorten-url.component.html',
  styleUrls: ['./shorten-url.component.css']
})
export class ShortenUrlComponent {

  inputUrl: string = '';

  shortenedUrl: string = '';

  constructor(private urlService: UrlService) {
  }

  public shortenUrl(): void {
    if (this.inputUrl === '') {
      return;
    }

    this.urlService.shortenUrl(this.inputUrl)
      .subscribe({
        next: (result: UrlKey): void => {
          this.shortenedUrl = result.urlKey;
        },
        error: (error): Observable<never> => this.handleError(error)
      });
  }

  private handleError(error: Error): Observable<never> {
    this.shortenedUrl = 'Do not input invalid url';
    console.error(error);
    return throwError(() => new Error('Something bad'));
  }
}
