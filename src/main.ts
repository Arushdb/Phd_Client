import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { refreshTokenInterceptor } from './app/interceptors/refresh-token.interceptor';

bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(
      withInterceptors([refreshTokenInterceptor])
    ),
    ...(appConfig.providers || [])
  ]
})
  .catch((err) => console.error(err));
