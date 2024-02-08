import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import { Repository, LessThanOrEqual } from 'typeorm'
import {CreateUserDto} from './dto/create-user.dto'
import {User} from './user.entity'
import {Mail} from './mail.entity'
import {Ecrypt} from './Ecrypt'
import { EmailService } from './mail.service';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Mail)
        private emailRepository: Repository<Mail>,
        private emailService: EmailService,
    ){}

    findAll() : Promise<User[]> {
        return this.userRepository.find();
    }
	
	getUser(userid: string) {
		const result = this.userRepository.findOne({ where: { userid: userid } });
		return result;
	}


    async generateVerificationCode(): Promise<string> {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendVerificationCode(email: string): Promise<void> {
        const verificationCode = await this.generateVerificationCode();
        await this.emailService.sendVerificationToEmail(
            email,
            verificationCode,
        );

        const json = {
            email: email,
            token: verificationCode,
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
        let ecrypt = new Ecrypt();
        user = await ecrypt.create(user);
        await this.userRepository.save(user);
    }

    async update(token : string) : Promise<string>  {    
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
}