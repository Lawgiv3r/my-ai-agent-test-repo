import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
