import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PrivilegeStatus {
  DENY = 0,
  ALLOW = 1,
  NOT_SET = 2,
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Entity({ name: 'privilege' })
export class Privilege {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column({ default: Action.Manage })
  action: Action;

  @Column({ default: PrivilegeStatus.ALLOW })
  status?: PrivilegeStatus;

  @CreateDateColumn({
    select: false,
    name: 'create_date',
  })
  createDate?: string;
}
