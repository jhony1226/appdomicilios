import db from '../loaders/postgresql';
import Logger from '../loaders/logger';
import serviseRepository from '../repository/service.rep';
import { ServiceInput, ServiceOutput } from '../models/service.model';
import { query } from 'winston';

export default class ServicesDalService implements serviseRepository {
    async registerService(service:ServiceInput): Promise<ServiceOutput> {

      const query = {
        text: `INSERT INTO services(id_client,id_deliv,price,destination,source,observation,id_status,creation_date,closing_date) VALUES(${service.idCliente},${service.idDeliv},${service.price},'${service.destination}','${service.source}','${service.observation}',${service.idStatus},'2021-01-01','2021-01-02')`
      };
        try { 
          
          const res = await db.query(query);  
          if(res.rowCount>=1)
          return service;
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
      throw error;
        }
      };

      async getServices(): Promise<ServiceOutput[]> {
        try { 
          const query = {
            text: 'select * from services',
          };
          const res = await db.query(query); 
          return res.rows; 
          
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
      throw error;
        }
      } ;

      async getServicesByDeliv(service: ServiceInput): Promise<ServiceOutput[]> {
        try { 
          const query = {
            text: 'select * from services where id_deliv = $1',
            values:[service.idDeliv]
          };
          const res = await db.query(query); 
          if(res.rowCount>=1) return res.rows;

          return undefined;
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
      throw error;
        }
      } ;

      async deleteService(service: ServiceInput): Promise<ServiceInput> {     
        const query = {
            text: 'delete from services where id=$1 ',
            values:[service.idService]
          };        
        try {
         const res= await db.query(query);        
         if(res.rowCount>=1)
         return service;
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
          throw error;
        }
      };

      async updateService(service: ServiceInput): Promise<ServiceOutput> {
        const query = {
          text:'UPDATE services SET id_client=$1, id_deliv=$2, price=$3, destination=$4, source=$5, observation=$6,id_status=$7 WHERE id=$8',
          values:[service.idCliente,service.idDeliv,service.price,service.destination,service.source,service.observation,service.idStatus,service.idService]
        };
        try {
          const res= await db.query(query);
          if(res.rowCount==1) return service;
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
          throw error;
        }
      };

      async findService(service: ServiceInput): Promise<ServiceOutput> {
        const query = {
          text:'select * from services where id=$1',
          values:[service.idService]
        };
        try {
          const res= await db.query(query);
          return res.rows[0];
        } catch (error) {
          Logger.error(`Error SQL => ${error}`);
          throw error;
        }
      };
}
