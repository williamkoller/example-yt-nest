import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleMapper } from './mappers/role.mapper';
import { Role, RoleDocument } from './schemas/role.schema';
import { RoleResponseType } from './types/role/role-response.type';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    private readonly usersService: UsersService,
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<RoleResponseType> {
    const user = await this.usersService.findOneById(createRoleDto.userId);

    const roles = await this.roleModel.find({
      name: { $regex: new RegExp(createRoleDto.name, 'i') },
    });

    if (roles.length) {
      throw new ConflictException('There is already a role with that name.');
    }

    const roleCreated = new this.roleModel({
      ...createRoleDto,
      userId: user.id,
    });

    const roleSaved = await roleCreated.save();

    return RoleMapper.toModel(roleSaved);
  }
}
