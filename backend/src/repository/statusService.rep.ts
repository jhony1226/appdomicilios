import { StatusServiceInput, StatusServiceOutput } from './../models/statusService.model';
export default interface StatusServiceRepository {
  //falta crud?
  registerStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput>;
  getStatusServices(): Promise<StatusServiceOutput[]>;
  updateStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput>;
  deleteStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput>;
  findStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput>;
}
