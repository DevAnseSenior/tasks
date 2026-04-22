import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('register')
    create(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('refresh')
    @HttpCode(200)
    async refresh(@Body('refresh_token') refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }
}