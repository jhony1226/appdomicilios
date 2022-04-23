import { ServiceInput, ServiceInputDel, ServiceOutput, ServiceOutputAll } from '../models/service.model';
import ServiceRepository from '../repository/service.rep';
import { ServiceInterface } from '../utils/helpers';
import { Service } from 'typedi';

@Service()
export default class ServicesService {
  constructor(@ServiceInterface() private servicesInterface: ServiceRepository) {}

  public async registerService(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.registerService(service);
    } catch (error) {
      throw error;
    }
  }
  public async getServices(): Promise<ServiceOutputAll[]> {
    try {
      return await this.servicesInterface.getServices();
    } catch (error) {
      throw error;
    }
  }
  public async getServicesByDeliv(service: ServiceInput): Promise<ServiceOutput[]> {
    try {
      return await this.servicesInterface.getServicesByDeliv(service);
    } catch (error) {
      throw error;
    }
  }

  public async getServiceById(service: any): Promise<any> {
    try {
      return await this.servicesInterface.getServiceById(service);
    } catch (error) {
      throw error;
    }
  }

  public async updateService(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.updateService(service);
    } catch (error) {
      throw error;
    }
  }
  public async updateStatus(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.updateStatus(service);
    } catch (error) {
      throw error;
    }
  }
  
  public async deleteService(service: any): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.deleteService(service);
    } catch (error) {
      throw error;
    }
  }
  public async findService(service: any): Promise<ServiceOutput> {
    try {
      console.log(service);
      
      return await this.servicesInterface.findService(service);
    } catch (error) {
      throw error;
    }
  }
  public async findUser(id): Promise<any> {
    try {
      return await this.servicesInterface.findUserById(id);
    } catch (error) {
      return error;
    }
  }
}
