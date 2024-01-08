import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    duplicateCheck(dynamicCondition: any): Promise<string>;
    create(user: CreateUserDto): Promise<void>;
}
