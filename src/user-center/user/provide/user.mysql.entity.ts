import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @UpdateDateColumn({
    name: 'update-date',
  })
  updateDate?: string;

  @CreateDateColumn({
    name: 'create-date',
  })
  createDate?: string;
}
