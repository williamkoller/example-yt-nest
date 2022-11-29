import { Role } from '../schemas/role.schema';

export abstract class RoleMapper {
  static toModel(role: Role) {
    return {
      id: role._id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      userId: role.userId,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }

  static toModels(roles: Role[]) {
    return roles.map(this.toModel);
  }
}
