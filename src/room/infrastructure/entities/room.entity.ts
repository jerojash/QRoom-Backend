import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'room'})
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    area: string

    @Column('text')
    name: string

    @OneToMany(
        ()=>CleaningActionEntity,
        cleaningActionEntity => cleaningActionEntity.room_
    )
    actions: CleaningActionEntity
}
