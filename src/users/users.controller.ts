import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  findOne(
    @Query('keyword') keyword: string,
    @Query('time_zone') time_zone: string,
  ) {
    return this.usersService.search(keyword, time_zone);
  }

  @Post('new')
  create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.date_created = new Date().toISOString();

    return this.usersService.create(user, createUserDto.time_zone);
  }
}
