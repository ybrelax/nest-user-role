import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

export enum UserStatus {
  disabled = 0,
  enabled = 1,
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100, nullable: true })
  nickname: string; //昵称

  // @Column({select: false}) // 只是进行查询的时候起作用
  @Exclude() // 序列化实现 过滤所有返回数据
  @Column()
  password: string; // 密码

  @Column({ nullable: true })
  avatar: string; //头像

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  role_id: string; // 用户角色

  @Column({ nullable: true })
  openid: string;

  @Column({ default: UserStatus.enabled })
  status?: UserStatus;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd?() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
