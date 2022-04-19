import { ServiceInput, ServiceInputDel, ServiceOutput, ServiceOutputAll } from './../models/service.model';
export default interface StatusServiceRepository {
  //falta crud?
  registerService(service: ServiceInput): Promise<ServiceOutput>;
  getServices(): Promise<ServiceOutputAll[]>;
  getServicesByDeliv(service: ServiceInput): Promise<ServiceOutput[]>;
  getServiceById(service: any): Promise<any>;
  updateService(service: any): Promise<ServiceOutput>;
  deleteService(service: ServiceInputDel): Promise<any>;
  findService(service: ServiceInput): Promise<ServiceOutput>;
}
