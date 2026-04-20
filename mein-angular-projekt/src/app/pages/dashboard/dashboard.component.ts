import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

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
}
