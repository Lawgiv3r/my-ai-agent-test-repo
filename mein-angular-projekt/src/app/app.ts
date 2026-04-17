import { Component, signal } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [SidebarComponent]
})
export class App {
  protected readonly title = signal('mein-angular-projekt');
}
