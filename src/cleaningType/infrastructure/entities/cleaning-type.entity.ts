import { CleaningActionEntity } from "src/cleaningAction/infrastructure/entities/cleaning-action.entity";
import { CleaningCheckEntity } from "src/cleaningCheck/infrastructure/entities/cleaning-check.entity";
import { PermissionsEntity } from "src/permissions/infrastructure/entities/permission.entity";
import { BaseEntity, Column, Entity, IsNull, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cleaning_type' })
export class CleaningTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {
        nullable: true
    })
    id_room?: string | null;

    @Column('timestamp',{
        nullable: true
    })
    created_at: Date|null;

    @OneToMany(
        ()=>CleaningCheckEntity,
        cleaningCheckEntity => cleaningCheckEntity.type
    )
    check: CleaningCheckEntity

    @OneToMany(
        ()=>CleaningActionEntity,
        cleaningActionEntity => cleaningActionEntity.cleaning_type_
    )
    actions: CleaningActionEntity;

    @OneToMany(
        ()=>PermissionsEntity,
        permissionsEntity => permissionsEntity.cleaningType
    )
    permissions: PermissionsEntity[]

}
