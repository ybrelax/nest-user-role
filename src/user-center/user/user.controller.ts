import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './provide/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/profile')
  profile(@Body() user: Payload) {
    return this.userService.profile(user.userId);
  }

  @Post('register')
  register(@Body() createUser: CreateUserDto) {
     return this.userService.register(createUser);
   }

  @Post('/list')
  findUserList() {
    return this.userService.findUserList();
  }

  @Post('/save')
  saveUser() {
    return this.userService.findUserList();
  }

  @Post('/delete')
  deleteUser(@Body('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
