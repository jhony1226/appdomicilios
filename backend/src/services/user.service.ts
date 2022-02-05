import { UserOutput, UserInput } from '@/models/user.model';
import UserRepository from '@/repository/user.rep';

import { UserInterface } from '@/utils/helpers';
import { Service } from 'typedi';

@Service()
export default class UserService {
  constructor(@UserInterface() private userInterface: UserRepository) {}

  public async getUsers(): Promise<UserOutput[]> {
    try {
      return await this.userInterface.getUsers();
    } catch (error) {
      throw error;
    }
  }
  
  public async registerUser(user: UserInput): Promise<UserInput> {
    try {
      return await this.userInterface.registerUser(user);
    } catch (error) {
      throw error;
    }
  }

  public async findUser(email): Promise<UserOutput> {
    try {
      return await this.userInterface.findUser(email);
    } catch (error) {
      return error;
    }
  }

  public async findEmail(user: UserInput): Promise<UserInput> {
    try {
      return await this.userInterface.findEmail(user)
    } catch (error) {
      return error;
    }
  }

  public async findPhone(user: UserInput): Promise<UserInput> {
    try {
      return await this.userInterface.findPhone(user)
    } catch (error) {
      return error;
    }
  }

  public async deleteUser(user: UserInput): Promise<UserInput> {
    try {
      return await this.userInterface.deleteUser(user)
    } catch (error) {
      return error;
    }
  }

  public async UpdateUser(user:UserInput):Promise<UserOutput>{
    try {
      return await this.userInterface.updateUser(user)
    } catch (error) {
      return error;
    }
  }
}
