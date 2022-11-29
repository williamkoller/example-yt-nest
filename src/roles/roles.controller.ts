import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RolesService } from './roles.service';
import { RoleResponseType } from './types/role/role-response.type';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body() createdRoleDto: CreateRoleDto,
  ): Promise<RoleResponseType> {
    return await this.rolesService.create(createdRoleDto);
  }
}
