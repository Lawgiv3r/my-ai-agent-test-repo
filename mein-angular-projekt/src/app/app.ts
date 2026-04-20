import { Component, signal } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

import { RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [RouterOutlet, 
    SidebarComponent,]
})
export class App {
  protected readonly title = signal('mein-angular-projekt');
}
