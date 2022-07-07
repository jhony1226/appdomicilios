import { NotificationInput, NotificationOutput, } from './../models/notifications.model';

export default interface NotificationRepository {
    registerNotification(service: NotificationInput): Promise<NotificationOutput>;
    getNotification(): Promise<NotificationInput>;
}