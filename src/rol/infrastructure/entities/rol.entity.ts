import { RoomEntity } from "src/room/infrastructure/entities/room.entity";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "rol"})
export class RolEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    name: string

    @OneToMany(
        ()=>UserEntity,
        userEntity => userEntity.rol
    )
    users: UserEntity

    @ManyToMany(()=>RoomEntity)
    @JoinTable({
        name: "permissions",
      })
    rooms: RoomEntity[]

}