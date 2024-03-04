import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

}