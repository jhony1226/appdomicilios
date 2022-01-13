import { ServiceInput, ServiceOutput } from './../models/service.model';
export default interface ServiceRepository {
  //falta crud?
  registerService(serviceInput: ServiceInput): Promise<ServiceOutput>;
}
