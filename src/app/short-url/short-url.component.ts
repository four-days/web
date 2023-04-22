import {Component} from '@angular/core';
import {UrlService} from "../url.service";

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent {

  inputUrl: string = '';

  shortenedUrl: string = '';

  constructor(private urlService: UrlService) {
  }

  public shortenUrl(): void {
    if (this.inputUrl === '') {
      return;
    }

    this.shortenedUrl = this.urlService.urlShorten(this.inputUrl);
  }
}
