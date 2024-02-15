import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {compareSync} from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService){}

    async login(email: string, password: string){
        const user  = await this.usersService.findOneByEmail(email);

        const pass = compareSync(password, user.password);

        if (!pass) throw new UnauthorizedException();

        const payload = { sub: user.id, email: user.email, roles: ['admin']};
        return {
          access_token: await this.jwtService.signAsync(payload),
        }
    }
}
