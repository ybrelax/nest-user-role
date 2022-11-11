import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class RolePrivilege {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  roleId: number;

  @Column()
  privilegeId: number;
}
