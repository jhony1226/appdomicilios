import { ServiceInput, ServiceInputDel, ServiceOutput, ServiceOutputAll } from './../models/service.model';
export default interface StatusServiceRepository {
  //falta crud?
  registerService(service: ServiceInput): Promise<ServiceOutput>;
  getServices(): Promise<ServiceOutputAll[]>;
  getServicesByDeliv(service: ServiceInput): Promise<ServiceOutput[]>;
 // updateService(service: ServiceInput): Promise<ServiceOutput>;
  updateStatus(service: ServiceInput): Promise<ServiceOutput>;
  //deleteService(service: any): Promise<ServiceOutput>;
  findService(service: any): Promise<ServiceOutput>;
  getServiceById(service: any): Promise<any>;
  updateService(service: any): Promise<ServiceOutput>;
  deleteService(service: ServiceInputDel): Promise<any>;
  //findService(service: ServiceInput): Promise<ServiceOutput>;
}
