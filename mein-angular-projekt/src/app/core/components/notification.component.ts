import { Component, Input, OnChanges, SimpleChanges, ElementRef, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationType, NotificationPosition, NotificationPriority } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="notification w-80 p-4 rounded-lg shadow-lg flex items-center justify-between animate-fade-in absolute"
      [ngClass]="getTypeClass()"
      [class]="getPositionClass()"
    >
      <span class="flex-1">{{ message }}</span>
      <button
        class="ml-2 text-white hover:text-gray-200 transition-colors"
        (click)="close()"
        aria-label="Notification schließen"
      >
        ×
      </button>
    </div>
  `,
  styles: [`
    .notification {
      @apply bg-white/10 backdrop-blur-sm;
    }
    
    .notification.success {
      @apply bg-green-500/90;
    }
    
    .notification.error {
      @apply bg-red-500/90;
    }
    
    .notification.info {
      @apply bg-blue-500/90;
    }
    
    .notification.warning {
      @apply bg-yellow-500/90;
    }
  `]
})
export class NotificationComponent implements OnChanges, OnDestroy {
  private readonly el = inject(ElementRef);

  @Input() message!: string;
  @Input() type: NotificationType = 'info';
  @Input() duration: number = 5000;
  @Input() position: NotificationPosition = 'top-start';
  @Input() priority: NotificationPriority = 'normal';

  private closeSubscription?: ReturnType<typeof setTimeout>;

  close(): void {
    if (this.closeSubscription) {
      clearTimeout(this.closeSubscription);
    }
    this.el.nativeElement.remove();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Wird aufgerufen, wenn message, type, duration, position oder priority geändert werden
    if (changes['duration'] && this.closeSubscription) {
      clearTimeout(this.closeSubscription);
      this.scheduleAutoClose();
    }
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      clearTimeout(this.closeSubscription);
    }
  }

  getPositionClass(): string {
    // Konvertiere Position in Tailwind-Klassen
    const positionMap: Record<NotificationPosition, string> = {
      'top-start': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-end': 'top-4 right-4',
      'bottom-start': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-end': 'bottom-4 right-4',
    };
    return positionMap[this.position] || 'top-4 left-4';
  }

  getTypeClass(): string {
    return `notification ${this.type}`;
  }

  scheduleAutoClose(): void {
    this.closeSubscription = setTimeout(() => {
      this.close();
    }, this.duration);
  }
}
