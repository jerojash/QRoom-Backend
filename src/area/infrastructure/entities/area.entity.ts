import { RoomEntity } from "src/room/infrastructure/entities/room.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'area'})
export class AreaEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string

    @OneToMany(
        ()=>RoomEntity,
        rooms => rooms.area
    )
    rooms: RoomEntity[]

    @Column('integer',{
        nullable: true
    })
    order: number;

}
