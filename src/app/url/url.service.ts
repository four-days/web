import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap, throwError } from "rxjs";
import { UrlKey } from "../models/urlKey";
import { AppConfigService } from "../config/app-config.service";
import { OriginalUrl } from "../models/originalUrl";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly urlApiUrl: string;

  private readonly urlRegex: RegExp = /^(http(s)?:\/\/)([a-z0-9\w]+\.*)+\.[a-z0-9]{2,}(:[0-9]+)?(\/[a-zA-Z0-9=%/?&#]*\/?)?$/;

  constructor(private appConfigService: AppConfigService,
              private http: HttpClient) {
    this.urlApiUrl = this.appConfigService.urlApiUrl;
  }

  public shortenUrl(url: string): Observable<UrlKey> {
    if (!this.validate(url)) {
      return throwError(() => new Error('invalid url'));
    }

    return this.http.post<UrlKey>(this.urlApiUrl, {url})
      .pipe(
        tap<UrlKey>({
          next: (response: UrlKey): void => this.printResult(response),
          error: (error): Observable<never> => this.handleError(error)
        })
      );
  }

  private validate(url: string): boolean {
    return this.urlRegex.test(url);
  }

  public redirect(urlKey: string): void {
    this.http.get<OriginalUrl>(`${this.urlApiUrl}/${urlKey}`)
      .subscribe({
        next: (response: OriginalUrl): void => location.replace(response.url),
        error: (error): Observable<never> => this.handleError(error)
      });
  }

  private printResult(result: any) {
    console.log(`result=${result}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`An error occurred. error status code is ${error.status}`);
    return throwError(() => new Error(error.message));
  }
}
