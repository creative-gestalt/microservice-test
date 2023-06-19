import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async search(keyword: string, time_zone: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('users')
      .orWhere('users.email LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('users.first_name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('users.last_name LIKE :keyword', { keyword: `%${keyword}%` })
      .getOne()
      .then((user) => {
        // Convert the date to their tz.
        user.date_created = new Date(user.date_created).toLocaleString(
          'en-US',
          { timeZone: time_zone },
        );
        return user;
      });
  }

  async create(user: User, time_zone: string): Promise<User> {
    return this.usersRepository.save(user).then((new_user) => {
      // Convert the date to their tz.
      new_user.date_created = new Date(new_user.date_created).toLocaleString(
        'en-US',
        { timeZone: time_zone },
      );
      return user;
    });
  }
}
