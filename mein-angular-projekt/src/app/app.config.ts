import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NotificationService } from './core/services/notification.service';
import { NotificationComponent } from './core/components/notification.component';
import {
  LucideAngularModule,
  Home, User, Star, Mail, Menu, X, Box, LogOut,
  Users, TrendingUp, Activity, CreditCard, LayoutDashboard, DollarSign,
  X as XIcon
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    NotificationService,
    NotificationComponent,
    importProvidersFrom(
      LucideAngularModule.pick({
        Home, User, Star, Mail, Menu, X, Box, LogOut,
        Users, TrendingUp, Activity, CreditCard, LayoutDashboard, DollarSign,
        XIcon
      })
    )
  ]
};
