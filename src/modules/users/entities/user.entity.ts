import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import omitKeyFromObj from 'src/utils/omitKeyFromObj';

@Entity('user')
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ length: 50 })
  @ApiProperty()
  login: string;

  @Column()
  @ApiProperty()
  @Exclude()
  password: string;

  @VersionColumn()
  @ApiProperty({ example: 1 })
  version: number;

  @CreateDateColumn({ name: 'createdAt' })
  @ApiProperty({ example: '2023-02-11T09:19:58.437Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @ApiProperty({ example: '2023-02-11T09:19:58.437Z' })
  updatedAt: Date;

  toResponse() {
    const response = omitKeyFromObj<UserEntity>('password', this);
    return response;
  }
}

export { UserEntity };
