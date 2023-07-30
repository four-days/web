import { Component } from '@angular/core';
import { UrlService } from "./url.service";
import { Observable, throwError } from "rxjs";
import { UrlKey } from "../models/url-key";

@Component({
  selector: 'app-shorten-url',
  templateUrl: './shorten-url.component.html',
  styleUrls: ['./shorten-url.component.css']
})
export class ShortenUrlComponent {

  inputUrl: string = '';

  shortenedUrl: string = '';

  showTooltip: boolean = false;

  constructor(private urlService: UrlService) {
  }

  public shortenUrl(): void {
    if (this.inputUrl === '') {
      return;
    }

    this.urlService.shortenUrl(this.inputUrl)
      .subscribe({
        next: (result: UrlKey): void => {
          this.shortenedUrl = `https://four.days/${result.urlKey}`;
          this.showTooltip = false;
        },
        error: (error): Observable<never> => this.handleError(error)
      });
  }

  public onKeydown(event: Event): void {
    event.preventDefault();
  }

  public copyShortenUrl(): void {
    if (this.shortenedUrl.startsWith('https://four.days')) {
      navigator.clipboard.writeText(this.shortenedUrl)
        .then(() => {
          this.showTooltip = true;
          setTimeout(() => {
            this.showTooltip = false;
          }, 1500);
        });
    }
  }

  private handleError(error: Error): Observable<never> {
    this.shortenedUrl = 'Enter a common URL!';
    console.error(error);
    return throwError(() => error);
  }
}
