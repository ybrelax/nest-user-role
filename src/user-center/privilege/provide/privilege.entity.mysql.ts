import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PrivilegeStatus {
  DENY = 0,
  ALLOW = 1,
  NOT_SET = 2,
}

@Entity({ name: 'privilege' })
export class Privilege {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column({ default: PrivilegeStatus.ALLOW })
  status: PrivilegeStatus;

  @CreateDateColumn({
    select: false,
  })
  createDate: string;
}
