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
    @Column('text',{
        name: 'id_room'
    })
    id_room: RoomEntity;

    @ManyToOne(
        ()=>UserEntity,
        (user_hk) => user_hk.actions
    )
    @Column('text',{
        name: 'id_house_keeper'
    })
    id_hk: UserEntity;

    @ManyToOne(
        ()=>CleaningTypeEntity,
        (cleaning_type) => cleaning_type.actions
    )
    @Column('text',{
        name: 'id_cleaning_type'
    })
    cleaning_type: CleaningTypeEntity;

    @Column('date')
    initial_time_hk: string;

    @ManyToOne(
        ()=>UserEntity,
        (user_sup) => user_sup.actions_sup
    )
    @Column('text',{
        name: 'id_supervisor'
    })
    id_sup: string;

    @Column('date')
    initial_time_sup: string

}
