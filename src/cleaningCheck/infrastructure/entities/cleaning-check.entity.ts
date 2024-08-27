import { CleaningTypeEntity } from "src/cleaningType/infrastructure/entities/cleaning-type.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";


@Entity({ name: 'cleaning_check' })
@Tree("materialized-path")
export class CleaningCheckEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('timestamp',{
        nullable: true
    })
    created_at: Date|null;

    @Column('integer',{
        nullable: true
    })
    order: number;

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
