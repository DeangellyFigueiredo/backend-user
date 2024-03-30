import exp from 'constants';
import { User } from './user.entity';

describe('UserEntity', () => {
  it('deve criar uma entidade de usuário', () => {
    const user = User.instance({
      name: 'Dean',
      surname: 'Figueiredo',
      email: 'dean_figueiredo@gmail.com',
      password: '123456',
      accessLevel: 1,
    });

    expect(user.name).toBe('Dean');
    expect(user.surname).toBe('Figueiredo');
    expect(user.email).toBe('dean_figueiredo@gmail.com');
    expect(user.password).toBe('123456');
    expect(user.accessLevel).toBe(1);
    expect(user.isActive).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('deve atualizar o usuário', () => {
    const user = User.instance({
      name: 'Dean',
      surname: 'Figueiredo',
      email: 'dean_figueiredo@gmail.com',
      password: '123456',
      accessLevel: 1,
    });

    user.name = 'Dean Figueiredo';
    user.surname = 'Coitinho';
    user.email = 'dean_coitinho@gmail.com';
    user.password = '1234567';
    user.accessLevel = 2;
    user.isActive = false;
    expect(user.name).toBe('Dean Figueiredo');
    expect(user.surname).toBe('Coitinho');
    expect(user.email).toBe('dean_coitinho@gmail.com');
    expect(user.password).toBe('1234567');
    expect(user.accessLevel).toBe(2);
    expect(user.isActive).toBe(false);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('deve atualizar a data de atualização', () => {
    const user = User.instance({
      name: 'Dean',
      surname: 'Figueiredo',
      email: 'dean_figueiredo@gmail.com',
      password: '123456',
      accessLevel: 1,
    });

    const updatedAt = user.updatedAt;
    user.name = 'Dean Figueiredo';

    expect(user.updatedAt).not.toBe(updatedAt);
  });
});
