import { ServiceInput, ServiceOutput } from '@/models/service.model';
import ServiceRepository from '@/repository/service.rep';
import { ServiceInterface } from '@/utils/helpers';
import { Service } from 'typedi';

@Service()
export default class ServicesService {
  constructor(@ServiceInterface() private servicesInterface: ServiceRepository) {}

  public async registerService(serviceInput: ServiceInput): Promise<ServiceOutput> {
    return;
  }
}
