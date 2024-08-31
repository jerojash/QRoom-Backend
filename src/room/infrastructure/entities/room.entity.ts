import { AreaEntity } from "src/area/infrastructure/entities/area.entity";
import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { PermissionsEntity } from "src/permissions/infrastructure/entities/permission.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'room'})
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string

    @OneToMany(
        ()=>CleaningActionEntity,
        cleaningActionEntity => cleaningActionEntity.room_
    )
    actions: CleaningActionEntity

    @OneToMany(
        ()=>PermissionsEntity,
        permissionsEntity => permissionsEntity.room
    )
    permissions: PermissionsEntity[]

    @ManyToOne(
        ()=>AreaEntity,
        AreaEntity => AreaEntity.rooms
    )
    area: AreaEntity

}
