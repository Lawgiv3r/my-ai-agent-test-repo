import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home, User, Star, Mail } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  protected readonly title = 'Sidebar';
  isCollapsed = false;
  home = Home;
  user = User;
  star = Star;
  mail = Mail;

  menuItems = [
    {
      title: 'Home',
      link: '/',
      icon: 'M3 9l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'
    },
    {
      title: 'About',
      link: '/about',
      icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
    },
    {
      title: 'Services',
      link: '/services',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
    },
    {
      title: 'Contact',
      link: '/contact',
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
    }
  ];

  ngOnInit() {
    // Initialisierung, falls nötig
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
