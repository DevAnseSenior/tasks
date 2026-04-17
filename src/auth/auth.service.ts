import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(dto: CreateUserDto) {
        const user = await this.usersService.create(dto);
        return { user };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                role: user.role,
            }
        };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = await this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const user = await this.usersService.findOne(payload.sub);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return this.login(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token')
        }
    }
}