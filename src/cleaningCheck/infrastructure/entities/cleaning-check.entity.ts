import { CleaningTypeEntity } from "src/cleaningType/infrastructure/entities/cleaning-type.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";


@Entity({ name: 'cleaning_check' })
@Tree("materialized-path")
export class CleaningCheckEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    name: string;

    @TreeChildren({cascade: true})
    sub_task: CleaningCheckEntity[]

    @TreeParent()
    parent_check: CleaningCheckEntity

    @ManyToOne(
        ()=>CleaningTypeEntity,
        (typeCleaning) => typeCleaning.check
    )
    type: CleaningTypeEntity;

}
