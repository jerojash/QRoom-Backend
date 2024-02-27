import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
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
