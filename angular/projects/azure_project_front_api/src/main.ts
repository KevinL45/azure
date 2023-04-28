import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {ApplicationRef, EnvironmentProviders, Provider, importProvidersFrom} from "@angular/core";
import {PreloadAllModules, provideRouter, withDebugTracing, withPreloading} from "@angular/router";
import {routes} from "./app/route";
import {provideHttpClient} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const providers: Array<Provider | EnvironmentProviders> = [
  provideRouter(routes, withDebugTracing(), withPreloading(PreloadAllModules)),
  provideHttpClient()
]

const loadApplication = (application: ApplicationRef) => {
  console.info(application)
}

bootstrapApplication(AppComponent, { providers, /*providers: [importProvidersFrom(BrowserAnimationsModule)]*/ }).then(loadApplication);
