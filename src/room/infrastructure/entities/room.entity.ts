import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { RolEntity } from "src/rol/infrastructure/entities/rol.entity";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
