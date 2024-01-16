import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

export class Ecrypt {
    async create(user:CreateUserDto) : Promise<CreateUserDto>  {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return await user;
    }

    //받은 password와 db에서 조회한 비밀번호와 비교
    async login(password:string, user:CreateUserDto) :  Promise<boolean>  {
        return await bcrypt.compare(password, user.password);
    }    

}


