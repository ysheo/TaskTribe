import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {User} from './user.entity'

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){}

    findAll() : Promise<User[]> {
        return this.userRepository.find();
    }

    // findOne(userid : string) : Promise<User> {
    //     return this.userRepository.findOne(userid);
    // }

    async duplicateCheck(dynamicCondition: any) : Promise<string> {
        let count = this.userRepository.count({
            where : dynamicCondition,        
        });

        return await count > 0 ? '중복' : '';
    }

    async create(user:CreateUserDto) {

        await this.userRepository.save(user)
    }
}
