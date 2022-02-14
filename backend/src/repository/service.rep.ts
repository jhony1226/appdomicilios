import { ServiceInput, ServiceOutput } from './../models/service.model';
export default interface StatusServiceRepository {
  //falta crud?
  registerService(service: ServiceInput): Promise<ServiceOutput>;
  getServices(): Promise<ServiceOutput[]>;
  getServicesByDeliv(service: ServiceInput): Promise<ServiceOutput[]>;
  updateService(service: ServiceInput): Promise<ServiceOutput>;
  deleteService(service: ServiceInput): Promise<ServiceOutput>;
  findService(service: ServiceInput): Promise<ServiceOutput>;
}
