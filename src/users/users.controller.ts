import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseType } from './types/user/user.response.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserResponseType[]> {
    return await this.usersService.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponseType> {
    return await this.usersService.findOneById(_id);
  }

  @Put(':_id')
  async update(
    @Param('_id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseType> {
    return await this.usersService.update(_id, updateUserDto);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string): Promise<void> {
    return await this.usersService.remove(_id);
  }
}
