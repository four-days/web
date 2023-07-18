import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {UrlKey} from "../models/url-key";
import {AppConfigService} from "../config/app-config.service";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly urlApiUrl: string;

  constructor(private appConfigService: AppConfigService,
              private http: HttpClient) {
    this.urlApiUrl = this.appConfigService.urlApiUrl;
  }

  public shortenUrl(url: string): Observable<UrlKey> {
    return this.http.post<UrlKey>(this.urlApiUrl, {url})
      .pipe(
        tap<UrlKey>({
          next: result => this.printResult(result),
          error: error => this.handleError(error)
        })
      );
  }

  private printResult(result: any) {
    console.log(`result=${result}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`An error occurred. error status code is ${error.status}`);
    return throwError(() => new Error(error.message));
  }
}