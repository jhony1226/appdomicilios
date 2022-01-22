import  {UserInput, UserOutput} from  './../models/user.model';


export default interface UserRepository{
    getUsers(): Promise<UserOutput[]>;
    registerUser(user:UserInput):Promise<UserOutput>;
    findUser(email): Promise<UserOutput>;  
    findById(id):Promise<UserOutput>
    updateUser(user:UserInput):Promise<UserOutput>;  
    deleteUser(user:UserInput): Promise<UserInput>
}