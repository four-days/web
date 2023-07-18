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

  get urlApiUrl() {
    this.checkConfig();
    return `${this.appConfig.api.url.server}${this.appConfig.api.path.url}`;
  }

  private checkConfig(): void {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
  }
}
