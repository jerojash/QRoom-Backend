import { CleaningTypeEntity } from "src/cleaningType/infrastructure/entities/cleaning-type.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cleaning_check' })
export class CleaningCheckEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    name: string;

    @Column('text')
    description: string;

    @ManyToOne(
        ()=>CleaningTypeEntity,
        (typeCleaning) => typeCleaning.check
    )
    type: CleaningTypeEntity;

}
