import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text',{
        unique: true
    })
    username: string

    @Column('text')
    password: string

    @Column('text')
    email: string

    @Column('text')
    first_name: string

    @Column('text')
    last_name: string

    @Column('text', {
        nullable:true
    })
    code_area_1: string

    @Column('text', {
        nullable:true
    })
    phone_number_1: string
}
