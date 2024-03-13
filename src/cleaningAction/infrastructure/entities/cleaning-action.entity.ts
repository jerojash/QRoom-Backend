import { CleaningTypeEntity } from "src/cleaningType/infrastructure/entities/cleaning-type.entity";
import { RoomEntity } from "src/room/infrastructure/entities/room.entity";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cleaning_action' })
export class CleaningActionEntity extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        ()=>RoomEntity,
        (room) => room.actions
    )
    room_: RoomEntity;

    @ManyToOne(
        ()=>UserEntity,
        (user_hk) => user_hk.actions
    )
    hk_: UserEntity | null;

    @ManyToOne(
        ()=>CleaningTypeEntity,
        (cleaning_type) => cleaning_type.actions
    )
    cleaning_type_: CleaningTypeEntity;

    @Column('timestamp',{
        nullable: true
    })
    initial_time_hk: string|null;

    @ManyToOne(
        ()=>UserEntity,
        (user_sup) => user_sup.actions_sup
    )
    sup_: UserEntity | null;

    @Column('timestamp',{
        nullable: true
    })
    initial_time_sup: string|null

}
