import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { 
  LucideAngularModule, 
  Home, User, Star, Mail, Menu, X, Box, LogOut,
  Users, TrendingUp, Activity, CreditCard, LayoutDashboard, DollarSign
} from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), importProvidersFrom(
      LucideAngularModule.pick({ Home, User, Star, Mail, Menu, X, Box, LogOut,
        Users, TrendingUp, Activity, CreditCard, LayoutDashboard, DollarSign
       })
    )
  ]
};
