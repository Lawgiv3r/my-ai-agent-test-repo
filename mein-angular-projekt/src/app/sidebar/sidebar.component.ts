import { Component, Input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed = signal(false);

  user = {
    name: 'Admin User',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
  };

  // Wir nutzen hier 'route', weil dein HTML 'item.route' erwartet
  menuItems = [
    { label: 'Dashboard', icon: 'Home', route: '/dashboard' },
    { label: 'Profil', icon: 'User', route: '/about' },
    { label: 'Services', icon: 'Star', route: '/services' },
    { label: 'Kontakt', icon: 'Mail', route: '/contact' }
  ];

  toggle = () => this.isCollapsed.update(v => !v);

  // Sicherheitshalber beide Namen, falls das HTML noch toggleSidebar() nutzt
  toggleSidebar() {
    this.toggle();
  }
}
