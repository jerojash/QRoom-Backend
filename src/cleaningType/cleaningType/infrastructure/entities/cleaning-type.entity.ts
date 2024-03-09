import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cleaning_type' })
export class CleaningTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    name: string;

    @Column('text')
    description: string;

}
