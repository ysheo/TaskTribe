import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity';
import {Mail} from './mail.entity';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import { EmailService } from './mail.service';

@Module({
    imports : [TypeOrmModule.forFeature([User,Mail])],
    controllers:[UserController],
    providers:[UserService, EmailService]
})

export class UserModule {}
