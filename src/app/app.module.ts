import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShortenUrlComponent } from './url/shorten-url.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppConfigService } from "./config/app-config.service";
import { RouterModule, Routes } from "@angular/router";
import { RedirectComponent } from './redirect/redirect.component';

const router: Routes = [
  {
    path: '',
    component: ShortenUrlComponent,
  },
  {
    path: '**',
    component: RedirectComponent,
  }
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: 'home', component: ShortenUrlComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ShortenUrlComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(router, {enableTracing: false}),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
