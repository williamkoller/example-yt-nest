import { User } from 'src/users/schemas/user.schema';

export abstract class UserMapper {
  static toModel(user: User) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toModels(users: User[]) {
    return users.map(this.toModel);
  }
}
