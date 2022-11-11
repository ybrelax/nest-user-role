import { ClassSerializerInterceptor, HttpException, HttpStatus, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './provide/user.dto';
import { User } from './provide/user.mysql.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  profile(userId) {
    return this.userRepository.findOneBy(userId);
  }

  // 注册用户
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  async findUserList() {
    const result = await this.userRepository.findAndCount();
    return {
      list: result[0],
      count: result[1],
    };
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number) {
    return this.userRepository.delete({
      id: userId,
    });
  }
}
