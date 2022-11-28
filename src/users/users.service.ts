import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bcrypt } from 'src/shared/cryptography/bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserMapper } from './mappers/user/user.mapper';
import { User, UserDocument } from './schemas/user.schema';
import { UserResponseType } from './types/user/user.response.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly bcrypt: Bcrypt,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseType> {
    const userFound = await this.findOneByEmail(createUserDto.email);

    if (userFound) {
      throw new ConflictException('There is already a user with that email.');
    }

    const newData = {
      ...createUserDto,
      password: await this.bcrypt.hash(createUserDto.password),
    };

    const userCreated = new this.userModel(newData);

    const userSaved = await userCreated.save();
    return UserMapper.toModel(userSaved);
  }

  async findAll(): Promise<UserResponseType[]> {
    const users = await this.userModel.find({}, { __v: false });

    if (!users.length) {
      throw new NotFoundException('No record found.');
    }

    return UserMapper.toModels(users);
  }

  async findOneById(_id: string): Promise<UserResponseType> {
    const userFound = await this.userModel.findOne({
      _id: { $eq: _id },
    });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toModel(userFound);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      email: { $eq: email },
    });
  }

  async findOneEmail(email: string): Promise<UserResponseType> {
    const userFound = await this.findOneByEmail(email);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toModel(userFound);
  }

  async update(
    _id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseType> {
    const userFound = await this.findOneById(_id);

    const userUpdated = await this.userModel.findOneAndUpdate(
      { _id: { $eq: userFound.id } },
      { ...updateUserDto },
      {
        new: true,
        __v: false,
      },
    );
    return UserMapper.toModel(userUpdated);
  }

  async remove(_id: string): Promise<void> {
    const userFound = await this.findOneById(_id);
    await this.userModel.remove({ _id: { $eq: userFound.id } });
  }
}
