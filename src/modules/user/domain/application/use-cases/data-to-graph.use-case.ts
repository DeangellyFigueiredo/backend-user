import { Either, success } from 'src/core/types/either';
import { EAccessLevel, User } from '../../enterprise/user.entity';
import { IUserRepository } from '../repositories/user.repository.contract';
import { GetAllUserUseCase } from './get-all-user.use-case';
import { UserVo } from '../../enterprise/value-objects/user-vo';

type DataToGraphcUseCaseResponse = Either<
  null,
  {
    role: string;
    quantity: number;
    quantityActive: number;
    quantityInactive: number;
  }[]
>;

export class DataToGraphcUseCase {
  constructor(private readonly getAllUserUseCase: GetAllUserUseCase) {}

  async execute(): Promise<DataToGraphcUseCaseResponse> {
    const user = await this.getAllUserUseCase.execute();

    const data = MapGraphData(user.value.users);
    return success(data);
  }
}

function MapGraphData(userVoData: UserVo[]) {
  const transformedData = userVoData.reduce(
    (accumulator, currentUser) => {
      const accessLevel = EAccessLevel[currentUser.accessLevel];
      const isActive = currentUser.isActive;

      const existingRole = accumulator.find(
        (item) => item.role.toString() === accessLevel.toString(),
      );

      if (existingRole) {
        existingRole.quantity++;
        if (isActive) {
          existingRole.quantityActive++;
        } else {
          existingRole.quantityInactive++;
        }
      } else {
        const newRole = {
          role: EAccessLevel[currentUser.accessLevel],
          quantity: 1,
          quantityActive: isActive ? 1 : 0,
          quantityInactive: isActive ? 0 : 1,
        };
        accumulator.push(newRole);
      }

      return accumulator;
    },
    [
      {
        role: 'ADMIN',
        quantity: 0,
        quantityActive: 0,
        quantityInactive: 0,
      },
      {
        role: 'GUEST',
        quantity: 0,
        quantityActive: 0,
        quantityInactive: 0,
      },
      {
        role: 'COMMON',
        quantity: 0,
        quantityActive: 0,
        quantityInactive: 0,
      },
    ],
  );
  return transformedData;
}
