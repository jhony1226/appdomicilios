import { StatusServiceInput, StatusServiceOutput } from '../models/statusService.model';
import StatusServiceRepository from '../repository/statusService.rep';
import { StatusServiceInterface } from '../utils/helpers';
import { Service } from 'typedi';

@Service()
export default class statusServicesService {
  constructor(@StatusServiceInterface() private statusServicesInterface: StatusServiceRepository) {}

  public async registerStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
    try {
      return await this.statusServicesInterface.registerStatusService(statusService);
    } catch (error) {
      throw error;
    }
  }
  public async getStatusServices(): Promise<StatusServiceOutput[]> {
    try {
      return await this.statusServicesInterface.getStatusServices();
    } catch (error) {
      throw error;
    }
  }
  public async updateStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
    try {
      return await this.statusServicesInterface.updateStatusService(statusService);
    } catch (error) {
      throw error;
    }
  }
  public async deleteStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
    try {
      return await this.statusServicesInterface.deleteStatusService(statusService);
    } catch (error) {
      throw error;
    }
  }
  public async findStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
    try {
      return await this.statusServicesInterface.findStatusService(statusService);
    } catch (error) {
      throw error;
    }
  }
}
