import { Router } from  'express';
import { userInfo } from 'os'; 
import services from './routes/services';
import user from './routes/user';
import role from './routes/role';
import statusService from './routes/statusService';
import notifications from './routes/notifications';


export default () => {
  const app = Router(); 
  services(app);
  user(app);
  role(app);
  statusService(app);
  notifications(app)
  

  return app;
};
