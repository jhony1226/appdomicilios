import db from '@/loaders/postgresql';
import Logger from '@/loaders/logger';
import statusServiseRepository from '@/repository/statusService.rep';
import { StatusServiceInput, StatusServiceOutput } from '@/models/statusService.model';
import { query } from 'winston';

export default class statusServiceDalService implements  statusServiseRepository{
    async registerStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
       const query = {
        text: `INSERT INTO status_service(name) VALUES('${statusService.name}')`
      };
        try { 
          
          const res = await db.query(query);  
          if(res.rowCount>=1)
          return statusService;
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
      throw error;
        }
    }
    getStatusServices(): Promise<StatusServiceOutput[]> {
        throw new Error('Method not implemented.');
    }
    updateStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
        throw new Error('Method not implemented.');
    }
    deleteStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
        throw new Error('Method not implemented.');
    }
    findStatusService(statusService: StatusServiceInput): Promise<StatusServiceOutput> {
        throw new Error('Method not implemented.');
    }

}