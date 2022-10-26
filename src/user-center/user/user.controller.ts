import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/profile')
  profile(@Body() user: Payload) {
    return this.userService.profile(user.userId);
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
