import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Mail{
    @PrimaryGeneratedColumn()
    uid : number;
    
    @Column({type: 'varchar', length: 100})
    email : string;

    // @ManyToOne(type => User, user => user.email)
    // @JoinColumn({ name: 'email', referencedColumnName: 'email'})
    // user: User;

    @Column({type: 'varchar', length: 10})
    token : string;
    
    @Column({type: 'boolean'})
    auth : boolean;

    @Column({type: 'datetime'})
    sessionStart : Date;

}
