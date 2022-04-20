

export interface UserOutput {
  idUser: number;
  idRole: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  registerDate: Date;
  status: string;
  idToken:string; 
}

export interface UserInput {
  idUser: number;
  idRole: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  registerDate: Date;
  status: string;
  idToken:string; 
} 

export interface TokenApp {
  idUser: number;  
  token:string;
  email:string;
}