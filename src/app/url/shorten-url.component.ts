import {Component} from '@angular/core';
import {UrlService} from "./url.service";
import {Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-short-url',
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
        next: response => {
          this.shortenedUrl = response.urlKey;
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.shortenedUrl = 'Do not input invalid url';
    console.error(error);
    return throwError(() => new Error('Something bad'));
  }
}
