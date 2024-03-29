import { UserVo } from 'src/modules/user/domain/enterprise/value-objects/user-vo';

export class UserPresenter {
  static toHTTP(properties: UserVo) {
    return {
      userId: properties.userId.toString(),
      name: properties.name,
      surname: properties.surname,
      email: properties.email,
      accessLevel: properties.accessLevel,
      createdAt: properties.createdAt,
    };
  }
}
