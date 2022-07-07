
export interface NotificationInput {
    idService: number,
    id: number;
    status: number;
    title:number;
    subtitle: string;
    fecha:Date;    
   descripcion:string;  
  }

  export interface NotificationOutput {
    idService: number,
    id: number;
    status: number;
    title:number;
    subtitle: string; 
    fecha:Date;  
    descripcion:string;  
  }