import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount = 0;
  isLoading = true;
  error: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getMyNotifications().subscribe({
      next: (res) => {
        this.notifications = res.data || [];
        this.unreadCount = res.unreadCount || 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load notifications';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openNotification(notification: Notification) {
    // Navigate first
    if (notification.link) {
      this.router.navigateByUrl(notification.link);
    }

    // Mark as read if unread
    if (!notification.isRead) {
      notification.isRead = true;
      this.unreadCount = Math.max(0, this.unreadCount - 1);
      this.cdr.detectChanges();

      this.notificationService.markAsRead(notification.id).subscribe({
        error: () => {
          notification.isRead = false;
          this.unreadCount++;
          this.cdr.detectChanges();
        }
      });
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
    this.unreadCount = 0;
    this.cdr.detectChanges();

    this.notificationService.markAllAsRead().subscribe({
      error: () => this.loadNotifications()
    });
  }
}
