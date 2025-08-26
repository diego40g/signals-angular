import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { loggingInterceptor, cachingInterceptor } from './pages/new-experimental-apis/interceptors';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    //provideClientHydration(withEventReplay()),
    provideClientHydration(withIncrementalHydration()),
    // Import the HttpClientModule for HTTP requests
    provideHttpClient(
      withInterceptors([loggingInterceptor, cachingInterceptor])
    ),
  ]
};
