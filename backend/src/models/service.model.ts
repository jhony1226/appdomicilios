

export interface ServiceInput {
  idService: number,
  idCliente: number;
  idDeliv: number;
  price:number;
  destination: string;
  source: string;
  observation: string;
  idStatus: number;
  
  
}

export interface ServiceOutput {
  idService: number,
  idCliente: number;
  idDeliv: number;
  price:number;
  destination: string;
  source: string;
  observation: string;
  idStatus: number;
  
}

export interface ServiceOutputAll {
  idService: number,
  idCliente: number;
  idDeliv: number;
  price:number;
  destination: string;
  source: string;
  observation: string;
  idStatus: number;
  name_deliv: string;
  name_dlient: string;
  name_status: string;
  
}
 
