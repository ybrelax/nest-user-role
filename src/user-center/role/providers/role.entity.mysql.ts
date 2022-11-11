import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', default: null })
  description?: string;

  @CreateDateColumn({ name: 'create_date' })
  createDate?: string;

  @UpdateDateColumn({ name: 'update_date' })
  updateData?: string;
}
