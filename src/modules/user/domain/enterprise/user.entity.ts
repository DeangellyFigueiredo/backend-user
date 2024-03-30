import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Entity } from '../../../../core/entities/entity';

export interface UserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  accessLevel: EAccessLevel;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export enum EAccessLevel {
  ADMIN = 1,
  COMMON = 2,
  GUEST = 3,
}

export class User extends Entity<UserProps> {
  static instance(
    props: Omit<UserProps, 'createdAt' | 'isActive'>,
    id?: UniqueEntityID,
  ) {
    return new User(
      {
        ...props,
        createdAt: new Date(),
        isActive: true,
      },
      id,
    );
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

  get password() {
    return this.props.password;
  }

  get accessLevel() {
    return this.props.accessLevel;
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  set accessLevel(accessLevel: EAccessLevel) {
    this.props.accessLevel = accessLevel;
    this.touch();
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
    this.touch();
  }
}
