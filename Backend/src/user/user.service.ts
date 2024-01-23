import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import { Repository, LessThanOrEqual } from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {User} from './user.entity'
import {Mail} from './mail.entity'
import { EmailService } from './mail.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Mail)
        private emailRepository: Repository<Mail>,
        private emailService: EmailService,
    ){}


    async findIdPassword(condition : any) : Promise<User> {
      return this.userRepository.findOne({where:condition});
    }

    async generateVerificationCode(): Promise<string> {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async codeCheck(condition : any) : Promise<number> {
      return await this.emailRepository.count({where:condition});      
    }

    async sendVerificationCode(email: string, type:string, title:string, id : string = ''): Promise<void> {
        const verificationCode = await this.generateVerificationCode();
        await this.emailService.sendVerificationToEmail(
            email,
            type === 'i' ? id : verificationCode,
            title,
            type,
        );

        const json = {
            email: email,
            token: verificationCode,
            type: type,
            auth: false, // or false depending on your needs
            sessionStart: new Date(), // Replace with the actual date
          };
        
        //console.log(json);

        await this.emailRepository.save(json);
        return;
      }

    async duplicateEmailCheck(dynamicCondition: any) : Promise<string> {
        let count = this.emailRepository.count({
            where : dynamicCondition,        
        });

        return await count > 0 ? '인증 메일 전송 완료' : '';
    }

    async duplicateCheck(dynamicCondition: any) : Promise<string> {
      let count = this.userRepository.count({
          where : dynamicCondition,        
      });

      return await count > 0 ? '중복' : '';
  }

    async create(user:CreateUserDto) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        await this.userRepository.save(user);
    }

    async emailVerify(token : string) : Promise<string>  {    
        const result = await this.emailRepository.count({
            where: {
              token: token,
              sessionStart: LessThanOrEqual(new Date(new Date().setHours(new Date().getHours() - 1)))
            }
          });
          
      if (result===0) {
        await this.emailRepository.update({ token: token},{auth:true});
        return '인증완료\n창을 닫아주세요';
        // 비교 작업 수행
      } else {
        // 데이터를 찾지 못한 경우 또는 조건이 맞지 않는 경우 처리
        return '세션이 만료되었습니다.\n재인증 부탁드립니다.';
      }
    }

    async changePassword(email : string,pwd : string){      
      const salt = await bcrypt.genSalt();
      //console.log(await bcrypt.hash(pwd, salt));
      await this.userRepository.update({ email},{password: await bcrypt.hash(pwd, salt)});
    }
}
