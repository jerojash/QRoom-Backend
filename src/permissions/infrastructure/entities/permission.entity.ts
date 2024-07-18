import { CleaningTypeEntity } from "src/cleaningType/infrastructure/entities/cleaning-type.entity";
import { RolEntity } from "src/rol/infrastructure/entities/rol.entity";
import { RoomEntity } from "src/room/infrastructure/entities/room.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "permissions"})
export class PermissionsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    // @Column('uuid')
    // public id_rol: string

    // @Column('uuid')
    // public id_room: string

    @ManyToOne(() => RolEntity, rol => rol.permissions)
    public rol: RolEntity

    @ManyToOne(() => RoomEntity, room => room.permissions)
    public room: RoomEntity

    @ManyToOne(() => CleaningTypeEntity, type => type.permissions)
    public cleaningType: CleaningTypeEntity
}
