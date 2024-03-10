import { CleaningCheckEntity } from "src/cleaningCheck/infrastructure/entities/cleaning-check.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cleaning_type' })
export class CleaningTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    name: string;

    @Column('text')
    description: string;

    @OneToMany(
        ()=>CleaningCheckEntity,
        cleaningCheckEntity => cleaningCheckEntity.type
    )
    check: CleaningCheckEntity

}
