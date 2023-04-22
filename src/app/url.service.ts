import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public urlShorten(url: string): string {
    return `${url} is shortened!!`;
  }
}
