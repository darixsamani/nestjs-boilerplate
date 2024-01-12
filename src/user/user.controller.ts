import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtQuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @UseGuards(JwtQuard)
  getMe(@GetUser() user: User, @GetUser('id') email: number) {
    console.log(user, 'email :', email);
    return user;
  }

  @Patch()
  @UseGuards(JwtQuard)
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    console.log('User id : ', userId);
    return this.userService.editUser(userId, dto);
  }
}
