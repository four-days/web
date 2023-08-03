import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) {
  }

  loadAppConfig(): Promise<any> {
    return lastValueFrom(this.http.get('/assets/config.json'))
      .then(data => this.appConfig = data);
  }

  get urlApiUrl(): string {
    this.checkConfig();
    return `${this.appConfig.api.url.server}${this.appConfig.api.path.url}`;
  }

  get siteUrl(): string {
    this.checkConfig();
    return `${this.appConfig.site.url}`;
  }

  private checkConfig(): void {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
  }
}
