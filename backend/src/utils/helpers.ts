 
import ServicesDalService from '../persistence/service.dal';
import UserDalService from '../persistence/user.dal';
import RoleDalService from '../persistence/role.dal';
import StatusServiceDalService from '../persistence/statusService.dal';
import Container, { Constructable, ContainerInstance } from 'typedi';
import NotificationDalService from '../persistence/notifications.dal';

 

export function ServiceInterface() {
  return function (object: Constructable<unknown>, propertyName: string, index?: number) {
    const serviceDalService = new ServicesDalService();
    Container.registerHandler({ object, propertyName, index, value: containerInstance => serviceDalService });
  };
}

export function UserInterface(){
  return function (object: Constructable<unknown>,propertyName: string,index?:number){
    const userDalService= new UserDalService();
    Container.registerHandler({object,propertyName,index,value: ContainerInstance=>userDalService})
  }
}

export function RoleInterface(){
  return function (object: Constructable<unknown>,propertyName: string,index?:number){
    const roleDalService= new RoleDalService();
    Container.registerHandler({object,propertyName,index,value: ContainerInstance=>roleDalService})
  }
}

export function StatusServiceInterface(){
  return function (object: Constructable<unknown>,propertyName: string,index?:number){
    const statusServiceDalService= new StatusServiceDalService();
    Container.registerHandler({object,propertyName,index,value: ContainerInstance=>statusServiceDalService})
  }
}

export function NotificationInterface(){
  return function (object: Constructable<unknown>,propertyName: string,index?:number){
    const notificationDalService= new NotificationDalService();
    Container.registerHandler({object,propertyName,index,value: ContainerInstance=>notificationDalService})
  }
}
 
