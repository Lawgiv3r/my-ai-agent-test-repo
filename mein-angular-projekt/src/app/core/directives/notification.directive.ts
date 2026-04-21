import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, inject, ComponentRef, EnvironmentInjector, createComponent } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from '../services/notification.service';
import { NotificationComponent } from '../components/notification.component';

@Directive({
  selector: '[appNotificationContainer]',
  standalone: true
})
export class NotificationDirective implements OnInit, OnDestroy {
  private readonly notificationService = inject(NotificationService);
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  private readonly injector = inject(EnvironmentInjector);
  private subscription: Subscription | null = null;
  private notificationContainer: HTMLElement | null = null;
  private notificationQueue: Notification[] = [];
  private readonly maxActiveNotifications = 3;
  private notificationComponents: ComponentRef<NotificationComponent>[] = [];

  ngOnInit(): void {
    // Erstelle den Notification-Container
    this.createNotificationContainer();

    // Abonnement für neue Notifications
    this.subscription = this.notificationService.notifications$.subscribe(notifications => {
      // Neue Notifications zur Queue hinzufügen
      const newNotifications = notifications.filter(n => 
        !this.notificationQueue.some(qn => qn.id === n.id)
      );
      
      this.notificationQueue.push(...newNotifications);
      
      // Verarbeite die Queue
      this.processNotificationQueue();
    });
  }

  private createNotificationContainer(): void {
    // Erstelle einen Container-Element
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    
    this.renderer.appendChild(this.el.nativeElement, container);
    this.notificationContainer = container;
  }

  private processNotificationQueue(): void {
    // Entferne bereits geschlossene Notifications aus der Queue
    const now = Date.now();
    this.notificationQueue = this.notificationQueue.filter(notification => {
      // Prüfe, ob die Notification noch aktiv ist
      const isActive = now - notification.createdAt < notification.duration;
      
      if (!isActive) {
        // Notification ist abgelaufen, entferne sie
        const index = this.notificationComponents.findIndex(comp => 
          comp.location.nativeElement.querySelector('.notification')?.getAttribute('data-id') === notification.id
        );
        if (index !== -1) {
          this.notificationComponents.splice(index, 1);
          // Entferne die Notification vom DOM
          const notificationElement = this.notificationContainer?.querySelector(
            `[data-id="${notification.id}"]`
          );
          if (notificationElement) {
            notificationElement.remove();
          }
        }
        return false;
      }
      
      return true;
    });

    // Füge die verbleibenden Notifications zum DOM hinzu
    this.notificationQueue.forEach(notification => {
      this.createNotificationComponent(notification);
    });

    // Prüfe, ob wir die maximale Anzahl erreicht haben
    const activeCount = this.notificationQueue.length;
    if (activeCount >= this.maxActiveNotifications) {
      // Entferne die älteste Notification (FIFO)
      const oldestNotification = this.notificationQueue.shift();
      if (oldestNotification) {
        const index = this.notificationComponents.findIndex(comp => 
          comp.location.nativeElement.querySelector('.notification')?.getAttribute('data-id') === oldestNotification.id
        );
        if (index !== -1) {
          this.notificationComponents.splice(index, 1);
          // Entferne die Notification vom DOM
          const notificationElement = this.notificationContainer?.querySelector(
            `[data-id="${oldestNotification.id}"]`
          );
          if (notificationElement) {
            notificationElement.remove();
          }
        }
      }
    }
  }

  private createNotificationComponent(notification: Notification): void {
    if (!this.notificationContainer) return;

    // Erstelle eine neue Notification-Instanz mit Angular
    const componentRef = createComponent(NotificationComponent, {
      environmentInjector: this.injector
    });

    // Setze die Input-Werte
    componentRef.instance.message = notification.message;
    componentRef.instance.type = notification.type;
    componentRef.instance.duration = notification.duration;
    componentRef.instance.position = notification.position || 'top-start';
    componentRef.instance.priority = notification.priority;

    // Füge die Notification zum Container hinzu
    const notificationElement = componentRef.location.nativeElement;
    notificationElement.setAttribute('data-id', notification.id);
    this.notificationContainer.appendChild(notificationElement);

    // Speichere die Komponente
    this.notificationComponents.push(componentRef);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    
    // Entferne alle verbleibenden Notifications
    this.notificationComponents.forEach(componentRef => {
      componentRef.destroy();
    });
    this.notificationComponents = [];
    
    // Entferne den Container
    if (this.notificationContainer) {
      this.renderer.removeChild(this.el.nativeElement, this.notificationContainer);
    }
  }
}

