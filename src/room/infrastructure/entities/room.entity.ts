import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'room'})
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    area: string

    @Column('text')
    name: string
}
