import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(dto: CreateUserDto): Promise<void>;
    duplicateCheck(dto: any): Promise<string>;
    createUser(user: CreateUserDto): Promise<void>;
}
