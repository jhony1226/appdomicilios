import {UserOutput ,UserInput } from '@/models/user.model';
import UserRepository from '@/repository/user.rep';  
 
import { UserInterface } from '@/utils/helpers';
import { Service } from 'typedi';

@Service()
export default class UserService {
  constructor(@UserInterface() private userInterface: UserRepository) {}

  public async getUser(): Promise<UserOutput[]> { 
    try {
        return await this.userInterface.getUser();
    } catch (error) {
        throw error;
    }
  }
  public async registerUser(user:UserInput): Promise<UserInput> { 
    console.log("register");
    
    try {
        return await this.userInterface.registerUser(user);
    } catch (error) {
        throw error;
    }
  }
}