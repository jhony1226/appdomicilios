import { ServiceInput, ServiceOutput } from '@/models/service.model';
import ServiceRepository from '@/repository/service.rep';
import { ServiceInterface } from '@/utils/helpers';
import { Service } from 'typedi';

@Service()
export default class 
ServicesService {
  constructor(@ServiceInterface() private servicesInterface: ServiceRepository) {}

  public async registerService(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.registerService(service);
    } catch (error) {
      throw error;
    }
  }
  public async getServices(): Promise<ServiceOutput[]> {
    try {
      return await this.servicesInterface.getServices();
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
  public async deleteService(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.deleteService(service);
    } catch (error) {
      throw error;
    }
  }
  public async findService(service: ServiceInput): Promise<ServiceOutput> {
    try {
      return await this.servicesInterface.findService(service);
    } catch (error) {
      throw error;
    }
  }
}
