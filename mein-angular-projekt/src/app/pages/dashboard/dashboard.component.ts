import { Component, signal, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NotificationService, NotificationType } from '../../core/services/notification.service';

interface StatCardData {
  title: string;
  value: number;
  icon: string;
  trend?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [LucideAngularModule]
})
export class DashboardComponent {
  protected readonly stats = signal<StatCardData[]>([
    {
      title: 'Aktive Nutzer',
      value: 1243,
      icon: 'Users',
      trend: 12.5
    },
    {
      title: 'System-Last',
      value: 42,
      icon: 'Activity',
      trend: -3.2
    },
    {
      title: 'Umsatz',
      value: 8432,
      icon: 'DollarSign',
      trend: 8.7
    },
    {
      title: 'Wachstum',
      value: 23,
      icon: 'TrendingUp',
      trend: 15.3
    }
  ]);

  protected readonly notificationService = inject(NotificationService);

  /**
   * Zeigt eine Test-Notification an
   */
  showTestNotification(type: NotificationType = 'info', message: string = 'Test Notification'): void {
    this.notificationService.show(message, type, 5000);
  }

  /**
   * Zeigt mehrere Test-Notifications an
   */
  showAllTestNotifications(): void {
    this.notificationService.show('✅ Erfolg: Operation erfolgreich abgeschlossen', 'success');
    setTimeout(() => {
      this.notificationService.show('⚠️ Warnung: Dies ist eine Warnung', 'warning' as NotificationType);
    }, 100);
    setTimeout(() => {
      this.notificationService.show('❌ Fehler: Etwas ist schiefgelaufen', 'error');
    }, 200);
  }
}
