import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
export type NotificationPosition = 'top-start' | 'top-center' | 'top-end' |
                                  'bottom-start' | 'bottom-center' | 'bottom-end';
export type NotificationPriority = 'low' | 'normal' | 'high';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
  priority: NotificationPriority;
  position?: NotificationPosition;
  createdAt: number; // Zeitstempel für Auto-Close Logik
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private readonly notificationSubject = new BehaviorSubject<Notification[]>([]);
  private notificationIdCounter = 0n; // bigint für Overflow-Schutz
  private readonly maxActiveNotifications = 3;
  private readonly defaultDuration = 5000; // 5 Sekunden in Millisekunden
  private readonly defaultPosition: NotificationPosition = 'top-start';

  constructor() {
    // Starte den Observable für die Notification-Direktive
    this.notificationSubject.asObservable().subscribe(notifications => {
      console.log('Notifications updated:', notifications);
    });
  }

  /**
   * Zeigt eine Notification an
   * @param message Die Nachricht
   * @param type Der Typ (success, error, info)
   * @param duration Dauer in Millisekunden (Standard: 5000ms)
   * @param priority Priorität (low, normal, high)
   * @param position Position (top-start, top-center, top-end, bottom-start, etc.)
   */
  show(
    message: string,
    type: NotificationType = 'info',
    duration: number = this.defaultDuration,
    priority: NotificationPriority = 'normal',
    position: NotificationPosition = this.defaultPosition
  ): void {
    // Prüfe, ob wir die maximale Anzahl aktiver Notifications erreicht haben
    const currentActiveCount = this.notifications.length;

    if (currentActiveCount >= this.maxActiveNotifications) {
      // Entferne die älteste Notification, wenn wir voll sind
      const oldestNotification = this.notifications.shift();
      if (oldestNotification) {
        this.notificationSubject.next([...this.notifications]);
      }
    }

    const notification: Notification = {
      id: `notification-${this.notificationIdCounter++}`,
      message,
      type,
      duration,
      priority,
      position,
      createdAt: Date.now()
    };

    this.notifications.push(notification);
    this.notificationSubject.next([...this.notifications]);
  }

  /**
   * Zeigt eine Notification mit hoher Priorität an
   * Diese wird sofort angezeigt und ältere Notifications werden entfernt
   */
  showHighPriority(message: string, type: NotificationType = 'error'): void {
    const currentNotifications = [...this.notifications];
    
    // Entferne alle aktiven Notifications außer denen mit hoher Priorität
    this.notifications = this.notifications.filter(n => n.priority === 'high');
    this.notificationSubject.next([...this.notifications]);
    
    // Zeige die neue Notification an
    this.show(message, type, this.defaultDuration, 'high', this.defaultPosition);
  }

  /**
   * Abonnement für alle Notifications
   */
  get notifications$(): BehaviorSubject<Notification[]> {
    return this.notificationSubject;
  }

  /**
   * Abruft der aktuellen aktiven Notifications
   */
  get activeNotifications(): Notification[] {
    return this.notifications;
  }

  /**
   * Schließt eine spezifische Notification
   * @param notificationId Die ID der Notification
   */
  close(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notificationSubject.next([...this.notifications]);
  }

  /**
   * Schließt alle Notifications
   */
  closeAll(): void {
    this.notifications = [];
    this.notificationSubject.next([...this.notifications]);
  }
}
