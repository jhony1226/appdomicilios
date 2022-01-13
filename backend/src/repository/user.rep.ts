import  {UserInput, UserOutput} from  './../models/user.model';


export default interface UserRepository{
    getUser(): Promise<UserOutput[]>;
    registerUser(user:UserInput):Promise<UserOutput>;

}