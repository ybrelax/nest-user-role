import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_privilege')
export class RolePrivilege {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  roleId: number;

  @Column()
  privilegeId: number;
}
