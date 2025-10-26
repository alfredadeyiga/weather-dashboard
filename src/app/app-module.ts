import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Details } from './components/details/details';
import { Forecasts } from './components/forecasts/forecasts';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SearchResults } from './components/header/search-results/search-results';
import { FormsModule } from '@angular/forms';
import { Spinner } from './shared/components/spinner/spinner';
import { spinnerInterceptor } from './interceptors/spinner-interceptor';
import { Sidebar } from './components/header/sidebar/sidebar';
import { Permission } from './shared/components/permission/permission';
import { Error } from './shared/components/error/error';

@NgModule({
  declarations: [App, Header, Details, Forecasts, SearchResults, Spinner, Sidebar, Permission, Error],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
