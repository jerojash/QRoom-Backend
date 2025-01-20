import { Either } from 'src/generics/Either';
import { ICleaningCheck } from '../domain/repository/ICleaningCheck';
import { CreateCleaningCheckDto } from './dto/create-cleaning-check.dto';
import { CleaningCheck } from '../domain/cleaningCheck';

export class createCleaningCheckService<T> {
  private CleaningCheckRepository: ICleaningCheck<T>;
  constructor(repo: ICleaningCheck<T>) {
    this.CleaningCheckRepository = repo;
  }
  async execute(dto: CreateCleaningCheckDto): Promise<Either<Error, T>> {
    let cleaningCheck: CleaningCheck;
    let result;
    // const cleaningCheck = CleaningCheck.create(dto.name, dto.order,
    //     dto.type_id, dto.id_parent_task);

    await Promise.all(
      dto.name.map(async (name, index) => {
        console.log('value: ', name);
        cleaningCheck = CleaningCheck.create(
          name,
          dto.order + index,
          dto.type_id ?? null,
          dto.id_parent_task ?? null
        );
        console.log('\n\nCHECK: ', cleaningCheck);
        result =
          this.CleaningCheckRepository.createCleaningCheck(cleaningCheck);
      })
    );

    // let result =
    //   this.CleaningCheckRepository.createCleaningCheck(cleaningCheck);
    return result;
  }
}
