import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    uid : number;

    @Column({unique:true, type: 'varchar', length: 50})
    userid : string;

    @Column({type: 'varchar', length: 255})
    password : string;
    
    @Column({type: 'varchar', length: 50})
    name : string;

    @Column({unique:true,type: 'varchar', length: 100})
    email : string;

    @Column({type: 'varchar', length: 10})
    regnum : string;
    
}
