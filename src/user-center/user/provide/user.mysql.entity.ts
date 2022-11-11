import bcrypt from "bcryptjs";
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100 })
  nickname: string;  //昵称

  @Exclude()  // 序列化实现 过滤所有返回数据
  // @Column({select: false}) // 只是进行查询的时候起作用
  @Column()
  password: string;  // 密码


  @Column()
  avatar: string;   //头像

  @Column()
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role_id: string;   // 用户角色

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
  async encryptPwd() { 
    this.password = await bcrypt.hashSync(this.password); 
  } 

}