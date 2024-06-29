import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @JoinColumn({
    name: 'user',
    referencedColumnName: 'uid',
    foreignKeyConstraintName: 'fk_user_id',
  })
  userid: number;

  @Column({ type: 'varchar', length: 50 })
  nickname: string;

  @Column({ type: 'blob', length: 50 })
  photo: Buffer;
}
