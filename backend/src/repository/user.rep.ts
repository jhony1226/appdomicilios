import  {  UserInput, UserOutput} from  './../models/user.model';


export default interface UserRepository{
    getUsers(): Promise<UserOutput[]>;
    getDeliverys(): Promise<UserOutput[]>;
    getClients(): Promise<UserOutput[]>;
    registerUser(user:UserInput):Promise<UserOutput>;
    findUser(email): Promise<UserOutput>;  
    findUserById(user:UserInput):Promise<UserOutput>;
    findEmail(user:UserInput): Promise<UserOutput>;
    findPhone(user:UserInput): Promise<UserOutput>;  
    updateUser(user:UserInput):Promise<UserOutput>;  
    deleteUser(user:UserInput): Promise<UserInput>
    registerTokenApk(token:any): Promise<any>
}