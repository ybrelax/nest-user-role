import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;
}
