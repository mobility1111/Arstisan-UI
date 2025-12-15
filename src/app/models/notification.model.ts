export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string | Date;
  type?: string;
  title?: string;
}