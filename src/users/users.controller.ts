import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseType } from './types/user/user.response.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseType[]> {
    return await this.usersService.findAll();
  }

  @Get(':_id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('_id') _id: string): Promise<UserResponseType> {
    return await this.usersService.findOneById(_id);
  }

  @Get('find-one-by-email/:email')
  @HttpCode(HttpStatus.OK)
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseType> {
    return await this.usersService.findOneEmail(email);
  }

  @Put(':_id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('_id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseType> {
    return await this.usersService.update(_id, updateUserDto);
  }

  @Delete(':_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('_id') _id: string): Promise<void> {
    await this.usersService.remove(_id);
  }
}
