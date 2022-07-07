import { NotificationInput,NotificationOutput } from '../models/notifications.model'; 
import { NotificationInterface } from '../utils/helpers';
import { Service } from 'typedi';
import NotificationRepository from '../repository/notifications.rep';

@Service()
export default class NotificationService {
  constructor(@NotificationInterface() private notificationInterface: NotificationRepository) {}

  public async registerNotification(noti: NotificationInput): Promise<NotificationOutput> {
    try {
      return await this.notificationInterface.registerNotification(noti);
    } catch (error) {
      throw error;
    }
  }
}