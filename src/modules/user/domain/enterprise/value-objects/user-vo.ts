import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { ValueObject } from 'src/core/entities/value-object';
import { EAccessLevel } from '../user.entity';

export interface UserProps {
  userId: UniqueEntityID;
  name: string;
  surname: string;
  email: string;
  accessLevel: EAccessLevel;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class UserVo extends ValueObject<UserProps> {
  static instance(props: UserProps) {
    return new UserVo(props);
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get surname() {
    return this.props.surname;
  }

  get email() {
    return this.props.email;
  }

  get accessLevel() {
    return this.props.accessLevel;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
