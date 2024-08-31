import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'area'})
export class AreaEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string

    // @OneToMany(
    //     ()=>PermissionsEntity,
    //     permissionsEntity => permissionsEntity.room
    // )
    // permissions: PermissionsEntity[]

}
