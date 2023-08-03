import { Component, OnInit } from '@angular/core';
import { UrlService } from "../url/url.service";

@Component({
  selector: 'app-redirect',
  template: '<h1>{{ this.message }}</h1>',
  styles: ['h1 { text-align: center }']
})
export class RedirectComponent implements OnInit {

  message: string = 'loading...';

  private urlKeyRegex: RegExp = /[/=-]+/;

  constructor(private urlService: UrlService) {
  }

  ngOnInit(): void {
    const urlKey: string = window.location.pathname.substring(1);
    if (this.urlKeyRegex.test(urlKey)) {
      console.log('error');
      this.message = 'Enter a valid urlKey';
    }

    this.urlService.redirect(urlKey);
  }
}
