import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/app/services/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = `${environment.baseApiUrl}/api/notifications`;

  private unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

constructor(private http: HttpClient) { }

 updateUnreadCount(count: number): void {
    console.log('🔢 Updating unread count to:', count);
    this.unreadCountSubject.next(count);
  }


  // ⬅️ Get notifications for logged-in user
  getMyNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/my`);
  }

  // ⬅️ Mark a notification as read
  markAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/mark-read/${notificationId}`, {});
  }

  // ⬅️ Mark all as read
  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.baseUrl}/mark-all-read`, {});
  }
}
